<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<item-component v-bind="runProps" />
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import HeaderInfosMixin from '../header-infos';
import RunDocMixin from '@/mixins/data-workflows/doc/run-doc-mixin';
import { storageToTablesRuns } from '@/store/modules/easy-firestore/storage-to-tables-runs';

@Component
export default class StorageToTablesRunsItemView extends Mixins(HeaderInfosMixin, RunDocMixin) {
	moduleName: string = storageToTablesRuns.moduleName;

	getDestinationTables() {
		return this.item.configuration_context.destinations[0].tables;
	}

	getDestinations() {
		return [
			{
				component: 'parameters-list',
				props: {
					groupTitle: 'Destination',
					tooltip: true,
					description: 'Tables where the files have to be loaded',
					paramItems: [
						{
							id: 'type',
							label: 'Destination Type',
							value: this.item.configuration_context.destinations[0].type,
							default: 'None'
						},
						{
							id: 'gcp_project_id',
							label: 'Project ID',
							value: this.item.configuration_context.destinations[0].gcp_project_id,
							default: 'None'
						},
						{
							id: 'gbq_dataset',
							label: 'Dataset',
							value: this.item.configuration_context.destinations[0].gbq_dataset,
							default: 'None'
						}
					]
				}
			},
			{
				component: 'parameters-table',
				props: {
					tableTitle: 'Tables',
					description: 'Tables List to be loaded from files',
					columns: [
						{
							label: 'Table Name',
							field: 'table_name'
						},
						{
							label: 'Filename Template',
							field: 'filename_template'
						},
						{
							label: 'Description',
							field: 'short_description'
						}
					],
					rows: this.getDestinationTables(),
					overriddenRows: [
						{
							name: 'table_name',
							component: 'TableName',
							props: {
								item: this.item,
								destinations: this.item.configuration_context.destinations[0]
							}
						}
					],
					vflexLength: 'xs9',
					lineNumbers: false,
					searchOptionsEnabled: true
				}
			},
			{
				component: 'parameters-list',
				props: {
					groupTitle: 'Default Parameters',
					tooltip: true,
					description: 'Default Paramters for Jobs loading files to tables',
					paramItems: [
						{
							id: 'source_format',
							label: 'Source Format',
							value: this.item.configuration_context.destinations[0].source_format,
							default: 'CSV',
							description: 'Default source format for input files. Only "CSV" or "JSON" are supported. Default : "CSV"'
						},
						{
							id: 'create_disposition',
							label: 'Creation Disposition',
							value: this.item.configuration_context.destinations[0].create_disposition,
							default: 'CREATE_IF_NEEDED'
						},
						{
							id: 'write_disposition',
							label: 'Write Disposition',
							value: this.item.configuration_context.destinations[0].write_disposition,
							default: 'WRITE_TRUNCATE'
						},
						{
							id: 'skip_leading_rows',
							label: 'Skip Leading Rows',
							value: this.item.configuration_context.destinations[0].skip_leading_rows,
							default: '1'
						},
						{
							id: 'field_delimiter',
							label: 'Field Delimiter',
							value: this.item.configuration_context.destinations[0].field_delimiter,
							default: '|'
						},
						{
							id: 'quote_character',
							label: 'Quote Character',
							value: this.item.configuration_context.destinations[0].quote_character,
							default: ''
						},
						{
							id: 'null_marker',
							label: 'Null Marker',
							value: this.item.configuration_context.destinations[0].null_marker,
							default: ''
						},
						{
							id: 'bq_load_job_ignore_unknown_values',
							label: 'Ignore Unknown Values',
							value: this.item.configuration_context.destinations[0].bq_load_job_ignore_unknown_values,
							default: false
						},
						{
							id: 'bq_load_job_max_bad_records',
							label: 'Max Bad Records',
							value: this.item.configuration_context.destinations[0].bq_load_job_max_bad_records,
							default: '0'
						},
						{
							id: 'bq_load_job_schema_update_options',
							label: 'Schema Update Options',
							value: this.item.configuration_context.destinations[0].bq_load_job_schema_update_options,
							default: '[]'
						},
						{
							id: 'bq_load_job_allow_quoted_newlines',
							label: 'Allow Quoted New Lines',
							value: this.item.configuration_context.destinations[0].bq_load_job_allow_quoted_newlines,
							default: false
						},
						{
							id: 'bq_load_job_allow_jagged_rows',
							label: 'Allow Jagged Rows',
							value: this.item.configuration_context.destinations[0].bq_load_job_allow_jagged_rows,
							default: false
						}
					]
				}
			}
		];
	}

	get itemTabsItems(): any {
		if (Object.keys(this.item).length === 0) return [];
		return [
			this.runDetailsTab,
			this.runLogsTab,
			this.configurationTab,
			this.fullJSONTab,
			this.otherRunsTab,
			this.notesTab
		];
	}

	get runDetailsData() {
		return [
			{
				component: 'view-header',
				props: {
					item: this.item,
					collection: this.moduleName,
					activeHeader: true,
					viewId: this.item.triggering_file,
					viewType: 'run',
					description: null,
					runStatus: this.item.status
				}
			},
			{
				component: 'parameters-list',
				props: {
					groupTitle: 'Context',
					tooltip: true,
					description: 'Context of the Table to Storage Run',
					paramItems: [
						{
							id: 'account',
							label: 'Account',
							value: this.item.account
						},
						{
							id: 'environment',
							label: 'Environment',
							value: this.item.environment
						}
					]
				}
			},
			{
				component: 'parameters-list',
				props: {
					groupTitle: 'Main parameters',
					tooltip: true,
					description: 'Main parameters of the Table to Storage Run',
					paramItems: [
						{
							id: 'configuration_id',
							label: 'Configuration Id',
							value: this.item.configuration_id
						},
						{
							id: 'triggering_file',
							label: 'Triggering File',
							value: this.item.triggering_file
						},
						{
							id: 'matching_filename_template',
							label: 'Matching Filename Template',
							value: this.item.matching_filename_template
						},
						{
							id: 'source_storage',
							label: 'Source Storage',
							value: this.item.source_storage
						}
					]
				}
			},
			{
				component: 'parameters-list',
				props: {
					groupTitle: 'Run Details',
					tooltip: true,
					description: 'Details of the Table to Storage Run',
					paramItems: [
						{
							id: 'dag_type',
							label: 'Dag Type',
							value: this.item.dag_type
						},
						{
							id: 'job_id',
							label: 'Job Id',
							value: this.item.job_id
						},
						{
							id: 'dag_execution_date',
							label: 'Execution Date',
							value: this.item.dag_execution_date
						},
						{
							id: 'dag_run_id',
							label: 'Dag Run Id',
							value: this.item.dag_run_id
						},
						{
							id: 'dag_generator_version',
							label: 'Dag Generator Version',
							value: this.item.dag_generator_version
						}
					]
				}
			}
		];
	}

	get configurationData() {
		return [
			{
				component: 'view-header',
				props: {
					item: this.item,
					activeHeader: false,
					viewId: this.item.configuration_id,
					viewType: 'conf',
					description: null,
					runStatus: this.item.status
				}
			},
			{
				component: 'parameters-list',
				props: {
					groupTitle: 'Context',
					tooltip: true,
					description: 'Context of the Table to Storage configuration',
					paramItems: [
						{
							id: 'account',
							label: 'Account',
							value: this.item.account
						},
						{
							id: 'environment',
							label: 'Environment',
							value: this.item.environment
						}
					]
				}
			},
			{
				component: 'parameters-table',
				props: {
					tableTitle: 'Source Storage',
					description: 'Source Storage of the files to load',
					columns: [
						{
							label: 'Type',
							field: 'source_type',
							width: '100px'
						},
						{
							label: 'Storage ID',
							field: 'gcs_source_bucket',
							width: '200px'
						},
						{
							label: 'Destination Folder',
							field: 'gcs_source_prefix',
							width: '200px'
						},
						{
							label: 'Archive Folder',
							field: 'gcs_archive_prefix',
							width: '200px'
						}
					],
					rows: [
						{
							source_type: this.item.configuration_context.source.type,
							gcs_source_bucket: this.item.configuration_context.source.gcs_source_bucket,
							gcs_source_prefix: this.item.configuration_context.source.gcs_source_prefix,
							gcs_archive_prefix: this.item.configuration_context.source.gcs_archive_prefix
						}
					],
					vflexLength: 'xs9',
					lineNumbers: false,
					searchOptionsEnabled: false
				}
			},
			...this.getDestinations(),
			{
				component: 'parameters-list',
				props: {
					groupTitle: 'Update information',
					paramItems: [
						{
							id: 'updated_date',
							label: 'Updated date',
							value: this.item.configuration_context.update_date || this.item.configuration_context.updated_date
						},
						{
							id: 'updated_by',
							label: 'Updated by',
							value: this.item.configuration_context.updated_by
						}
					]
				}
			}
		];
	}
}
</script>
