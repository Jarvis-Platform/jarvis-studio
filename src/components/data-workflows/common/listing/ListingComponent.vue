<template>
	<v-container fluid>
		<v-toolbar class="elevation-O" color="transparent">
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
			class="elevation-1"
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
				<v-icon small @click="toggleExpand(item)">remove_red_eye</v-icon>
				<v-icon v-if="showAirflowAction" class="ml-2" small @click="openAirflowDagRunUrl(item)">open_in_new</v-icon>
				<v-icon v-if="showDeleteAction" class="ml-2" small @click="openDeleteDialog(item)">delete_forever</v-icon>
			</template>

			<!-- Loop placed after default templates to override them if needed -->
			<template v-for="overriddenColumn in overriddenColumns" v-slot:[`item.${overriddenColumn}`]="{ item }">
				<slot :name="overriddenColumn" v-bind="{ item }" />
			</template>

			<template v-slot:expanded-item="{ headers }">
				<td ref="expandedItem" :colspan="headers.length" class="pa-0">
					<div class="expanded-item pa-4">
						<v-btn class="close-btn" color="warning" fab small dark outlined>
							<v-icon @click="toggleExpand(viewedItem)">close</v-icon>
						</v-btn>

						<vue-json-pretty
							:data="viewedItem"
							:deep="5"
							:show-double-quotes="true"
							:show-length="true"
							:show-line="false"
						/>
					</div>
				</td>
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

<script>
import ConfigurationStatus from '../configuration/ConfigurationStatus.vue';
import ListingFilters from './ListingFilters';
import VueJsonPretty from 'vue-json-pretty';
import RunStatusChip from '@/components/data-workflows/common/runs/RunStatusChip';

import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
import store from '@/store';
import merge from 'lodash.merge';
import moment from 'moment';
import { CONFIGURATIONS, RUNS, STATUS } from '@/constants/data-workflows/status';
import { getActiveConfColor } from '@/util/data-workflows/configuration';
import { dagRunAirflowUrl } from '@/util/data-workflows/run';

export default {
	name: 'listing-component',
	components: { ConfigurationStatus, ListingFilters, VueJsonPretty, RunStatusChip },
	props: {
		type: {
			// Use RUNS or CONFIGURATIONS constants
			type: String,
			required: true
		},
		moduleName: {
			type: String,
			required: true
		},
		headers: {
			type: Array,
			required: true
		},
		customDataFetching: {
			type: Function
		},
		isOtherRunDisplay: {
			type: Boolean
		},
		jobId: {
			type: String
		},
		overriddenColumns: {
			type: Array
		},
		sortBy: {
			type: String,
			default: 'dag_execution_date'
		},
		sortDesc: {
			type: Boolean,
			default: true
		},
		itemsPerPage: {
			type: Number,
			default: 10
		},
		showAirflowAction: {
			type: Boolean
		},
		showDeleteAction: {
			type: Boolean
		}
	},
	data() {
		return {
			isLoading: false,
			search: '',
			expanded: [],
			viewedItem: {},
			showDeleteDialog: false,
			showDeleteItemDetails: false,
			showSnackbarDeleteConfSuccess: false,
			itemToDelete: {},
			customFetchedItems: []
		};
	},
	mounted() {
		this.getFirestoreData();
	},
	// activated() {
	// 	// TODO: refetch without isLoading and removing all displayed data, and them when refetch is done
	// 	this.getFirestoreData();
	// },
	methods: {
		toggleExpand(item) {
			const isAlreadyExpand = this.expanded.filter(expandedItem => expandedItem.id === item.id).length === 1;

			if (isAlreadyExpand) {
				this.expanded = [];
			} else {
				this.expanded = [item];
				this.viewedItem = item;
			}
		},
		openAirflowDagRunUrl(item) {
			window.open(dagRunAirflowUrl(item.dag_id, item.dag_run_id, item.dag_execution_date), '_blank');
		},
		openDeleteDialog(item) {
			this.itemToDelete = item;
			this.showDeleteDialog = true;
		},
		cancelDeleteConfFromFirestore() {
			this.showDeleteDialog = false;
			this.itemToDelete = {};
			this.showDeleteItemDetails = false;
		},
		confirmDeleteConfFromFirestore() {
			this.showDeleteDialog = false;
			this.showSnackbarDeleteConfSuccess = false;
			store.dispatch(`${this.moduleName}/delete`, this.itemToDelete.id).then(() => {
				this.showSnackbarDeleteConfSuccess = true;
			});
			this.itemToDelete = {};
			this.showDeleteItemDetails = false;
		},
		async getFirestoreData() {
			let where;

			if (this.isOtherRunDisplay) {
				const minDate = moment()
					.utc()
					.startOf('day')
					.subtract(1, 'month')
					.toISOString();

				where = [
					['dag_execution_date', '>=', minDate],
					['job_id', '==', this.jobId]
				];
			} else {
				switch (this.type) {
					case RUNS:
						where = this.whereRunsFilter;
						break;
					case CONFIGURATIONS:
						where = this.whereConfFilter;
						break;
					case STATUS:
						where = this.whereStatusFilter;
						break;
					default:
						where = [];
				}
			}

			this.isLoading = true;

			if (this.customDataFetching) {
				this.customDataFetching().then(items => {
					this.customFetchedItems = items;
					this.isLoading = false;
				});
			} else {
				await store.dispatch(`${this.moduleName}/closeDBChannel`, { clearModule: true });
				await store.dispatch(`${this.moduleName}/openDBChannel`, { where, limit: 0 });

				this.isLoading = false;
			}
		}
	},
	computed: {
		...mapState({
			firestoreItems(state) {
				return state[this.moduleName].data;
			}
		}),
		...mapGetters({
			periodFiltered: 'filters/periodFiltered',
			whereStatusFilter: 'filters/whereStatusFilter',
			whereRunsFilter: 'filters/whereRunsFilter',
			whereConfFilter: 'filters/whereConfFilter'
		}),
		formattedItems() {
			const dataArray = Object.values(this.firestoreItems);
			const formattedData = dataArray.map(function(data) {
				return {
					//color for the activated status
					activeConfColor: getActiveConfColor(data.activated)
				};
			});
			return merge(dataArray, formattedData);
		}
	},
	watch: {
		whereStatusFilter() {
			this.getFirestoreData();
		},
		whereRunsFilter() {
			this.getFirestoreData();
		},
		whereConfFilter() {
			this.getFirestoreData();
		}
	}
};
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
