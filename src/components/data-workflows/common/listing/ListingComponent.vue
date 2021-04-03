<template>
	<v-container fluid>
		<v-toolbar class="elevation-O" color="transparent" flat>
			<v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details />

			<v-spacer />

			<listing-filters v-if="!isOtherRunDisplay" :type="type" />
			<v-icon right @click="getFirestoreData" v-if="!isLoading">refresh</v-icon>
			<v-progress-circular indeterminate size="20" color="primary" v-if="isLoading" />
		</v-toolbar>

		<v-data-table
			:headers="headers"
			:items="customDataFetching ? customFetchedItems : formattedItems"
			:search="search"
			:loading="isLoading"
			:expanded="expanded"
			:sort-by.sync="sortBy"
			:sort-desc.sync="sortDesc"
			item-key="id"
			class="mb-16"
			:items-per-page="itemsPerPage"
		>
			<v-progress-linear v-slot:progress color="blue" indeterminate />

			<template v-slot:item.activated="{ item }">
				<configuration-status :item="item" :collection="moduleName" :is-activated="item.activated" />
			</template>

			<template v-slot:item.status="{ item: { id, status } }">
				<run-status-chip :status="status" :doc-id="id" :collection="moduleName" is-small />
			</template>

			<template v-slot:item.actions="{ item }">
				<div class="d-flex">
					<direct-execution-icon
						v-if="directExecutionPath"
						:direct-execution="getDirectExecution(item, directExecutionPath)"
					/>
					<v-icon v-if="showDeleteAction" class="ml-2" small @click="openDeleteDialog(item)">delete_forever</v-icon>
				</div>
			</template>

			<!-- Loop placed after default templates to override them if needed -->
			<template v-for="overriddenColumn in overriddenColumns" v-slot:[`item.${overriddenColumn}`]="{ item }">
				<slot :name="overriddenColumn" v-bind="{ item }" />
			</template>

			<v-alert v-slot:no-results :value="true" color="error" icon="warning">
				Your search for "{{ search }}" found no results.
			</v-alert>
		</v-data-table>

		<v-dialog v-model="showDeleteDialog" width="45%" max-width="700">
			<v-card light>
				<v-card-title class="headline">Delete Item</v-card-title>
				<v-card-text>
					Do you really want to delete this item?
					<h3 class="pt-3"><v-icon size="18">arrow_forward</v-icon>{{ itemToDelete.id }}</h3>
				</v-card-text>

				<v-card-actions>
					<v-btn @click="showDeleteItemDetails = !showDeleteItemDetails">
						{{ showDeleteItemDetails ? 'Hide details' : 'Show more' }}
					</v-btn>
					<v-spacer />
					<v-btn color="grey" text @click="cancelDeleteConfFromFirestore">Cancel</v-btn>
					<v-btn color="error" @click="confirmDeleteConfFromFirestore">Delete</v-btn>
				</v-card-actions>

				<v-slide-y-transition>
					<v-card-text v-show="showDeleteItemDetails">
						<vue-json-pretty :data="itemToDelete" :deep="5" :show-length="true" :show-line="false"> </vue-json-pretty>
					</v-card-text>
				</v-slide-y-transition>
			</v-card>
		</v-dialog>

		<!-- TODO: Add @closeSnackbar & timeout const -->
		<v-snackbar v-model="showSnackbarDeleteConfSuccess" color="success" :timeout="3500">
			Configuration deleted with success!
		</v-snackbar>
	</v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { AnyObject, RoleCode } from '@/types';
import { Getter } from 'vuex-class';
import merge from 'lodash.merge';
import moment from 'moment';

import ConfigurationStatus from '../configuration/ConfigurationStatus.vue';
import ListingFilters from './ListingFilters.vue';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import RunStatusChip from '@/components/data-workflows/common/runs/RunStatusChip.vue';
import DirectExecutionIcon from '@/components/data-workflows/common/item/parameters/custom-parameters-item/DirectExecutionIcon.vue';

import { CONFIGURATIONS, RUNS, STATUS } from '@/constants/data-workflows/status';
import { getActiveConfColor } from '@/util/data-workflows/configuration';
import { mapState } from 'vuex';

type Filter = [string, string, any];

@Component({
	components: { ConfigurationStatus, DirectExecutionIcon, ListingFilters, VueJsonPretty, RunStatusChip },
	computed: {
		...mapState({
			firestoreItems(state: any) {
				return state[this.moduleName].data;
			},
		}),
	},
})
export default class ListingComponent extends Vue {
	@Prop({ type: String, required: true }) type!: string; // TODO: Use RUNS or CONFIGURATIONS constants
	@Prop({ type: String, required: true }) moduleName!: string;
	@Prop({ type: Array, required: true }) headers!: [];
	@Prop({ type: String, default: 'dag_execution_date' }) sortBy?: string[];
	@Prop({ type: Boolean, default: true }) sortDesc?: boolean;
	@Prop({ type: Number, default: 10 }) itemsPerPage?: number;
	@Prop({ type: String }) directExecutionPath?: string;
	@Prop({ type: Boolean, default: false }) showDeleteAction?: boolean;
	@Prop(Function) customDataFetching?: () => Promise<any>;
	@Prop(Boolean) isOtherRunDisplay?: boolean;
	@Prop(String) jobId?: string;
	@Prop(Array) overriddenColumns?: string[];

	@Getter('user/role') userRole!: RoleCode;
	@Getter('filters/periodFiltered') periodFiltered!: string[];
	@Getter('filters/whereStatusFilter') whereStatusFilter!: Filter[];
	@Getter('filters/whereRunsFilter') whereRunsFilter!: Filter[];
	@Getter('filters/whereConfFilter') whereConfFilter!: Filter[];

	@Watch('whereStatusFilter')
	onWhereStatusFilterChange() {
		this.getFirestoreData();
	}

	@Watch('whereRunsFilter')
	onWhereRunsFilterChange() {
		this.getFirestoreData();
	}

	@Watch('whereConfFilter')
	onWhereConfFilterChange() {
		this.getFirestoreData();
	}

	@Watch('$route.name')
	async onRouteNameChanged() {
		// _identifier is not existing to properly close channel (Discussed with Luca)
		await this.$store.dispatch(`${this.moduleName}/closeDBChannel`, { _identifier: 'none' });
	}

	private firestoreItems: any;
	isLoading: boolean = false;
	search: string = '';
	expanded: AnyObject[] = [];
	viewedItem: object = {};
	showDeleteDialog: boolean = false;
	showDeleteItemDetails: boolean = false;
	showSnackbarDeleteConfSuccess: boolean = false;
	itemToDelete: AnyObject = {};
	customFetchedItems: AnyObject[] = [];

	mounted() {
		this.getFirestoreData();
	}

	// activated() {
	// 	// TODO: refetch without isLoading and removing all displayed data, and them when refetch is done
	// 	this.getFirestoreData();
	// }

	toggleExpand(item: AnyObject) {
		const isAlreadyExpand = this.expanded.filter((expandedItem) => expandedItem.id === item.id).length === 1;

		if (isAlreadyExpand) {
			this.expanded = [];
		} else {
			this.expanded = [item];
			this.viewedItem = item;
		}
	}

	getDirectExecution(item: any, path: string) {
		path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
		path = path.replace(/^\./, ''); // strip a leading dot
		const a = path.split('.');
		for (let i = 0, n = a.length; i < n; ++i) {
			if (typeof item === 'string') return;
			const k = a[i];
			if (k in item) {
				item = item[k];
			} else {
				return;
			}
		}
		return item;
	}

	openDeleteDialog(item: AnyObject) {
		this.itemToDelete = item;
		this.showDeleteDialog = true;
	}

	cancelDeleteConfFromFirestore() {
		this.showDeleteDialog = false;
		this.itemToDelete = {};
		this.showDeleteItemDetails = false;
	}

	confirmDeleteConfFromFirestore() {
		this.showDeleteDialog = false;
		this.showSnackbarDeleteConfSuccess = false;
		this.$store.dispatch(`${this.moduleName}/delete`, this.itemToDelete.id).then(() => {
			this.showSnackbarDeleteConfSuccess = true;
		});
		this.itemToDelete = {};
		this.showDeleteItemDetails = false;
	}

	async getFirestoreData() {
		let where: Filter[];
		let wherePerfAttribute: string = '';

		if (this.isOtherRunDisplay) {
			const minDate = moment().utc().startOf('day').subtract(1, 'month').toISOString();

			where = [
				['dag_execution_date', '>=', minDate],
				['job_id', '==', this.jobId],
			];
			wherePerfAttribute = 'otherRunDisplay';
		} else {
			switch (this.type) {
				case RUNS:
					where = this.whereRunsFilter;
					wherePerfAttribute = 'whereRunsFilter';
					break;
				case CONFIGURATIONS:
					where = this.whereConfFilter;
					wherePerfAttribute = 'whereConfFilter';
					break;
				case STATUS:
					where = this.whereStatusFilter;
					wherePerfAttribute = 'whereStatusFilter';
					break;
				default:
					where = [];
			}
		}

		const trace = this.$perf().trace('listing-trace');
		trace.putAttribute('moduleName', this.moduleName);
		trace.putAttribute('where', wherePerfAttribute);
		trace.start();

		this.isLoading = true;

		if (this.customDataFetching) {
			this.customDataFetching().then((items: AnyObject[]) => {
				this.customFetchedItems = items;
				this.isLoading = false;
			});
		} else {
			await this.$store.dispatch(`${this.moduleName}/closeDBChannel`, { clearModule: true });
			await this.$store.dispatch(`${this.moduleName}/openDBChannel`, { where, limit: 0 });

			this.isLoading = false;
		}

		trace.stop();
	}

	get formattedItems() {
		const dataArray = Object.values(this.firestoreItems);
		const formattedData = dataArray.map(function (data: any) {
			return {
				activeConfColor: getActiveConfColor(data.activated, data.archived),
			};
		});
		return merge(dataArray, formattedData);
	}
}
</script>

<style lang="scss">
.expanded-item {
	position: relative;
	max-height: 75vh;
	overflow-y: scroll;
	word-break: break-all;

	.close-btn {
		z-index: 1;
		position: -webkit-sticky;
		position: sticky;
		top: 0;
		float: right;
		background-color: white;
	}
}
</style>
