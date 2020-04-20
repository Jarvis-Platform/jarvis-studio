<template>
	<div>
		<data-model-header :tableItems="tableItems" />

		<v-container class="grey lighten-5">
			<v-progress-linear v-if="isLoading" :indeterminate="true" />

			<template v-else>
				<v-row v-if="isJsonValid">
					<v-col cols="12" offset="0">
						<v-card>
							<v-card-title>
								<v-icon color="blue-grey lighten-3" large class="mr-3">table_chart</v-icon>
								<span class="display-1 font-weight-bold">{{ this.dataTableDetails.id }}</span>

								<v-spacer />

								<div class="card-title-right">
									<v-tooltip bottom>
										<template v-slot:activator="{ on }">
											<span v-on="on"> Last Update: {{ refreshedTimestamp.dateFromNow }} </span>
										</template>
										<span>{{ refreshedTimestamp.dateFormatted }}</span>
									</v-tooltip>

									<v-btn @click="getDataTableDetails">Refresh</v-btn>
									<v-btn @click="queryInBigQuery" color="secondary">Query</v-btn>
								</div>
							</v-card-title>

							<v-card-text>
								<v-row>
									<v-col>
										<v-textarea
											name="Description"
											label="Description"
											:value="dataTableDetails.description"
											auto-grow
											rows="1"
											readonly
											outline
										/>
									</v-col>
								</v-row>

								<v-row>
									<v-col cols="3">
										<v-text-field label="Account" :value="dataTableDetails.account" class="title" readonly outline />
									</v-col>

									<v-col cols="3">
										<v-text-field label="Project Id" :value="this.projectId" class="title" readonly outline />
									</v-col>

									<v-col cols="3">
										<v-text-field label="Dataset" :value="this.datasetId" class="title" readonly outline />
									</v-col>

									<v-col cols="3">
										<v-text-field label="Location" :value="dataTableDetails.location" class="title" readonly outline />
									</v-col>
								</v-row>

								<v-row>
									<v-col cols="3">
										<v-text-field label="Row Number" :value="numRowsFormatted" class="title" readonly outline />
									</v-col>

									<v-col cols="3">
										<v-text-field label="Table Size" :value="numBytesFormatted" class="title" readonly outline />
									</v-col>

									<v-col cols="3">
										<v-text-field label="Table Type" :value="dataTableDetails.kind" class="title" readonly outline />
									</v-col>

									<v-col cols="3">
										<v-text-field label="Time Partitioned" :value="isTimePartitioned" class="title" readonly outline />
									</v-col>
								</v-row>
							</v-card-text>
						</v-card>
					</v-col>

					<v-col cols="12">
						<v-tabs
							v-model="activeTab"
							color="black"
							background-color="#E0E0E0"
							slider-color="primary"
							class="elevation-1"
						>
							<v-tab ripple href="#dataoverview">Data Overview</v-tab>
							<v-tab ripple href="#schema">Schema</v-tab>
							<v-tab ripple href="#workflow">Workflow</v-tab>
							<v-tab ripple href="#documentation">Documentation</v-tab>
							<v-tab ripple href="#fulljson">Full Json</v-tab>
							<v-tab ripple href="#notes">Notes</v-tab>

							<v-tab-item value="dataoverview">
								<v-card>
									<v-card-title>
										<span class="title">Data Overview</span>
										<v-spacer />
									</v-card-title>
									<v-card-text>
										<vue-good-table :columns="this.columns" :rows="this.rows" styleClass="vgt-table condensed striped">
											<template slot="table-row" slot-scope="props">
												<span class="body-1">{{ props.formattedRow[props.column.field] }}</span>
											</template>
										</vue-good-table>
									</v-card-text>
								</v-card>
							</v-tab-item>

							<v-tab-item value="schema">
								<v-card>
									<tableSchemaView :schemaRows="dataTableDetails.schema.fields" />
								</v-card>
							</v-tab-item>

							<v-tab-item value="workflow">
								<v-card>
									<v-card-title>
										<span class="title mt-2 ml-1">{{ dataTableDetails.dag_id }}</span>
										<v-spacer />
									</v-card-title>
									<v-card-text>
										<v-row>
											<v-col>
												<v-textarea
													name="Description"
													label="Description"
													:value="dataTableDetails.short_description"
													auto-grow
													rows="1"
													readonly
													outline
												/>
											</v-col>
										</v-row>
										<v-row>
											<v-col cols="5">
												<v-text-field
													label="Workflow Id"
													:value="dataTableDetails.dag_id"
													class="subtitle-1"
													readonly
													outline
												/>
											</v-col>
											<v-col cols="2">
												<v-text-field
													label="Workflow Type"
													:value="dataTableDetails.dag_type"
													class="subtitle-1"
													readonly
													outline
												/>
											</v-col>
											<v-col cols="3">
												<v-text-field
													label="Workflow Run Id"
													:value="dataTableDetails.dag_run_id"
													class="subtitle-1"
													readonly
													outline
												/>
											</v-col>
											<v-col cols="2">
												<v-text-field
													label="Last Modified"
													:value="this.workflowLastModifiedTime"
													class="subtitle-1"
													readonly
													outline
												/>
											</v-col>
										</v-row>
									</v-card-text>
								</v-card>
							</v-tab-item>

							<v-tab-item value="documentation">
								<v-card>
									<v-card-text>
										<v-row>
											<v-col class="ml-3" cols="10" offset="0">
												<vue-markdown :source="dataTableDetails.doc_md" />
											</v-col>
										</v-row>
									</v-card-text>
								</v-card>
							</v-tab-item>

							<v-tab-item value="fulljson">
								<v-card>
									<v-card-title>
										<span class="title">Full Json</span>
										<v-spacer />
									</v-card-title>
									<v-card-text>
										<vue-json-pretty
											:data="this.dataTableDetails"
											:deep="5"
											:show-double-quotes="true"
											:show-length="true"
											:show-line="false"
										>
										</vue-json-pretty>
									</v-card-text>
								</v-card>
							</v-tab-item>

							<v-tab-item value="notes">
								<notes-tab
									module-name="dataTableDetails"
									:related-doc-id="`${projectId}-${datasetId}-${tableId}`"
									:account="dataTableDetails.account"
								/>
							</v-tab-item>
						</v-tabs>
					</v-col>
				</v-row>

				<JsonSchemaIsInvalid v-else :jsonObject="this.dataTableDetails" :jsonObjectErrors="this.jsonObjectErrors" />
			</template>
		</v-container>
	</div>
</template>

<script lang="ts">
// TODO: Refactor view

import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import VueJsonPretty from 'vue-json-pretty';
import store from '@/store';
import moment from 'moment';
import JsonSchemaIsInvalid from '@/components/data-models/InvalidSchema.vue';
import DataModelHeader from '@/components/data-models/DataModelHeader.vue';
import tableSchemaView from '@/components/data-workflows/common/item/schema/TableSchemaView.vue';
import NotesTab from '@/components/data-workflows/common/item/notes/NotesTab.vue';
// library to validate Object Json Schema from Firestore
import Ajv, { ErrorObject } from 'ajv';
// library to convert units (bite to Go ) and format number
import VueMarkdown from 'vue-markdown';

import { DATA_TABLE_DETAILS, TABLES_LISTING } from '@/constants/router/routes-names';
import { getBigQueryURL, getFormattedNumBytes, getFormattedNumRows } from '@/util/data-models';

import 'vue-good-table/dist/vue-good-table.css';

interface Column {
	label: string;
	field: string;
}

@Component({
	components: {
		VueJsonPretty,
		tableSchemaView,
		JsonSchemaIsInvalid,
		DataModelHeader,
		'vue-good-table': require('vue-good-table').VueGoodTable,
		VueMarkdown,
		NotesTab
	},
	computed: {
		...mapState({
			dataTableDetails: (state: any) => state.dataTableDetails.data,
			schemas: (state: any) => state.schemas.data
		})
	}
})
export default class DataTableDetails extends Vue {
	private dataTableDetails: any; // TODO: Type
	private schemas: any; // TODO: Type

	isLoading: boolean = true;
	columns: Column[] = [];
	rows: never[] = [];
	schemaRows: never[] = [];
	activeTab: null = null;
	isJsonValid: boolean | PromiseLike<any> = false;
	jsonObjectErrors: ErrorObject[] | null | undefined = null;

	async activated() {
		await this.getDataTableDetails();
	}

	async getDataTableDetails() {
		this.isLoading = true;
		await this.getFirestoreData();

		const ajv = new Ajv({ allErrors: true });
		const schema = JSON.parse(this.schemas['gbq-table-preview-table'].schema);
		const testJson = ajv.compile(schema);

		this.isJsonValid = testJson(this.dataTableDetails);
		this.jsonObjectErrors = testJson.errors;

		if (this.isJsonValid) {
			this.rows = Object.values(this.dataTableDetails.json);
			const dataTableOverviewColumnsKey = Object.keys(this.rows[0]);
			this.columns = dataTableOverviewColumnsKey.map((data: string) => ({ label: data, field: data }));
			this.schemaRows = Object.values(this.dataTableDetails.schema.fields);
		}

		this.isLoading = false;
	}

	async getFirestoreData() {
		await store.dispatch('dataTableDetails/closeDBChannel', {
			clearModule: true
		});
		await store.dispatch('dataTableDetails/fetchAndAdd', {
			projectId: this.projectId,
			datasetId: this.datasetId,
			tableId: this.tableId,
			limit: 0
		});
	}

	queryInBigQuery() {
		window.open(getBigQueryURL(this.projectId, this.datasetId, this.tableId), '_blank');
	}

	get tableId() {
		return this.$route.params.tableId;
	}

	get datasetId() {
		return this.$route.params.datasetId;
	}

	get projectId() {
		return this.$route.params.projectId;
	}

	get numBytesFormatted() {
		return getFormattedNumBytes(Number(this.dataTableDetails.numBytes));
	}

	get numRowsFormatted() {
		return getFormattedNumRows(Number(this.dataTableDetails.numRows));
	}

	get isTimePartitioned() {
		return this.dataTableDetails.timePartitioning !== undefined;
	}

	get refreshedTimestamp() {
		const dateFormatted = moment(this.dataTableDetails.refreshed_timestamp).format('YYYY/MM/DD - HH:mm');
		const dateFromNow = moment(this.dataTableDetails.refreshed_timestamp).fromNow();
		return {
			dateFormatted: dateFormatted,
			dateFromNow: dateFromNow
		};
	}

	get workflowLastModifiedTime() {
		return moment(this.dataTableDetails.lastModifiedTime, 'x').format('YYYY/MM/DD - HH:mm');
	}

	get tableItems() {
		return [
			{
				text: this.projectId
			},
			{
				text: this.datasetId,
				to: {
					name: TABLES_LISTING,
					params: { projectId: this.projectId, datasetId: this.datasetId }
				}
			},
			{
				text: this.tableId,
				to: {
					name: DATA_TABLE_DETAILS,
					params: { projectId: this.projectId, datasetId: this.datasetId }
				}
			}
		];
	}
}
</script>

<style lang="scss">
.v-input__slot {
	&:before {
		display: none;
	}
}

.card-title-right {
	& > * {
		margin-right: 10px;

		&:last-of-type {
			margin-right: 0;
		}
	}
}
</style>
