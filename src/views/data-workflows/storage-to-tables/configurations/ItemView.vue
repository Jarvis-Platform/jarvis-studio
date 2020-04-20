<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<item-component v-bind="configurationProps" />
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import HeaderInfosMixin from '../header-infos';
import ConfigurationDocMixin from '@/mixins/data-workflows/doc/configuration-doc-mixin';

import { storageToTablesConfs } from '@/store/modules/easy-firestore/storage-to-tables-confs';
import { storageToTablesConfArchive } from '@/store/modules/easy-firestore/storage-to-tables-conf-archive';

@Component
export default class StorageToTablesConfigurationsItemView extends Mixins(HeaderInfosMixin, ConfigurationDocMixin) {
	moduleName: string = storageToTablesConfs.moduleName;
	archivedConfsModuleName: string = storageToTablesConfArchive.moduleName;

	getDestinationTables() {
		return this.item.destinations[0].tables;
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
						{ id: 'type', label: 'Destination Type', value: this.item.destinations[0].type, default: 'None' },
						{
							id: 'gcp_project_id',
							label: 'Project ID',
							value: this.item.destinations[0].gcp_project_id,
							default: 'None'
						},
						{ id: 'gbq_dataset', label: 'Dataset', value: this.item.destinations[0].gbq_dataset, default: 'None' }
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
								destinations: this.item.destinations[0]
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
							value: this.item.destinations[0].source_format,
							default: 'CSV',
							description: 'Default source format for input files. Only "CSV" or "JSON" are supported. Default : "CSV"'
						},
						{
							id: 'create_disposition',
							label: 'Creation Disposition',
							value: this.item.destinations[0].create_disposition,
							default: 'CREATE_IF_NEEDED'
						},
						{
							id: 'write_disposition',
							label: 'Write Disposition',
							value: this.item.destinations[0].write_disposition,
							default: 'WRITE_TRUNCATE'
						},
						{
							id: 'skip_leading_rows',
							label: 'Skip Leading Rows',
							value: this.item.destinations[0].skip_leading_rows,
							default: '1'
						},
						{
							id: 'field_delimiter',
							label: 'Field Delimiter',
							value: this.item.destinations[0].field_delimiter,
							default: '|'
						},
						{
							id: 'quote_character',
							label: 'Quote Character',
							value: this.item.destinations[0].quote_character,
							default: ''
						},
						{
							id: 'null_marker',
							label: 'Null Marker',
							value: this.item.destinations[0].null_marker,
							default: ''
						},
						{
							id: 'bq_load_job_ignore_unknown_values',
							label: 'Ignore Unknown Values',
							value: this.item.destinations[0].bq_load_job_ignore_unknown_values,
							default: false
						},
						{
							id: 'bq_load_job_max_bad_records',
							label: 'Max Bad Records',
							value: this.item.destinations[0].bq_load_job_max_bad_records,
							default: '0'
						},
						{
							id: 'bq_load_job_schema_update_options',
							label: 'Schema Update Options',
							value: this.item.destinations[0].bq_load_job_schema_update_options,
							default: '[]'
						},
						{
							id: 'bq_load_job_allow_quoted_newlines',
							label: 'Allow Quoted New Lines',
							value: this.item.destinations[0].bq_load_job_allow_quoted_newlines,
							default: false
						},
						{
							id: 'bq_load_job_allow_jagged_rows',
							label: 'Allow Jagged Rows',
							value: this.item.destinations[0].bq_load_job_allow_jagged_rows,
							default: false
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
					collection: this.moduleName,
					activeHeader: true,
					viewId: this.item.id,
					viewType: 'conf',
					description: null
				}
			},
			{
				component: 'parameters-list',
				props: {
					groupTitle: 'Context',
					tooltip: true,
					description: 'Context of the Storage to Tables configuration',
					paramItems: [
						{
							id: 'configuration_type',
							label: 'Configuration Type',
							value: this.item.configuration_type
						},
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
							label: 'Project ID',
							field: 'gcp_project_id',
							width: '200px'
						},
						{
							label: 'Storage ID',
							field: 'gcs_source_bucket',
							width: '200px'
						},
						{
							label: 'Source Folder',
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
							source_type: this.item.source.type,
							gcp_project_id: this.item.source.gcp_project_id,
							gcs_source_bucket: this.item.source.gcs_source_bucket,
							gcs_source_prefix: this.item.source.gcs_source_prefix,
							gcs_archive_prefix: this.item.source.gcs_archive_prefix
						}
					],
					vflexLength: 'xs9',
					lineNumbers: false,
					searchOptionsEnabled: false
				}
			},
			...this.getDestinations()
		];
	}
}
</script>
