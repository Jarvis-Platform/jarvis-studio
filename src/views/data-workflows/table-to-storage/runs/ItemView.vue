<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabs-items="tabsItems" />
		<item-component v-bind="runProps" />
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import HeaderInfosMixin from '../header-infos';
import DirectExecutionIcon from '@/components/data-workflows/common/item/parameters/custom-parameters-item/DirectExecutionIcon.vue';
import RunDocMixin from '@/mixins/data-workflows/doc/run-doc-mixin';
import { tableToStorageRuns } from '@/store/modules/easy-firestore/table-to-storage-runs';

@Component
export default class TableToStorageRunsItemView extends Mixins(HeaderInfosMixin, RunDocMixin) {
	moduleName: string = tableToStorageRuns.moduleName;

	get itemTabsItems(): any {
		if (Object.keys(this.item).length === 0) return [];
		return [
			this.runDetailsTab,
			this.runLogsTab,
			this.configurationTab,
			this.fullJSONTab,
			this.otherRunsTab,
			this.notesTab,
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
					viewId: this.item.firestore_conf_doc_id,
					viewType: 'run',
					description: null,
					runStatus: this.item.status,
				},
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
							value: this.item.account,
						},
						{
							id: 'environment',
							label: 'Environment',
							value: this.item.environment,
						},
						{
							id: 'direct_execution',
							label: 'Direct Execution',
							component: DirectExecutionIcon,
							properties: {
								directExecution: this.item.configuration_context.direct_execution,
							},
						},
					],
				},
			},
			{
				component: 'parameters-list',
				props: {
					groupTitle: 'Main parameters',
					tooltip: true,
					description: 'Main parameters of the Table to Storage Run',
					paramItems: [
						{
							id: 'firestore_conf_doc_id',
							label: 'Configuration Id',
							value: this.item.firestore_conf_doc_id,
						},
						{
							id: 'destination_bucket',
							label: 'Destination Bucket',
							value: this.item.destination_bucket,
						},
						{
							id: 'output_filename',
							label: 'Output Finame',
							value: this.item.output_filename,
						},
					],
				},
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
							label: 'Configuration Type',
							value: this.item.dag_type,
						},
						{
							id: 'job_id',
							label: 'Job Id',
							value: this.item.job_id,
						},
						{
							id: 'dag_execution_date',
							label: 'Execution Date',
							value: this.$moment(this.item.dag_execution_date, '').format('YYYY/MM/DD - HH:mm:ss'),
						},
						{
							id: 'dag_run_id',
							label: 'Run Id',
							value: this.item.dag_run_id,
						},
						{
							id: 'dag_generator_version',
							label: 'Generator Version',
							value: this.item.dag_generator_version,
						},
					],
				},
			},
		];
	}

	get configurationData() {
		return [
			{
				component: 'view-header',
				props: {
					item: this.item,
					activeHeader: false,
					viewId: this.item.firestore_conf_doc_id,
					viewType: 'conf',
					description: null,
					runStatus: this.item.status,
				},
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
							value: this.item.account,
						},
						{
							id: 'environment',
							label: 'Environment',
							value: this.item.environment,
						},
					],
				},
			},
			{
				component: 'parameters-table',
				props: {
					tableTitle: 'Destination Storage',
					description: 'Destination Storage of the file to export',
					columns: [
						{
							label: 'Type',
							field: 'source_type',
							width: '100px',
						},
						{
							label: 'Storage ID',
							field: 'gcs_dest_bucket',
							width: '200px',
						},
						{
							label: 'Destination Folder',
							field: 'gcs_dest_prefix',
							width: '200px',
						},
						{
							label: 'Output Filename',
							field: 'output_filename',
							width: '200px',
						},
					],
					rows: [
						{
							source_type: 'GCS',
							gcs_dest_bucket: this.item.configuration_context.gcs_dest_bucket,
							gcs_dest_prefix: this.item.configuration_context.gcs_dest_prefix,
							output_filename: this.item.configuration_context.output_filename,
						},
					],
					vflexLength: 'xs9',
					lineNumbers: false,
					searchOptionsEnabled: false,
				},
			},
			{
				component: 'parameters-list',
				props: {
					groupTitle: 'File Parameters',
					tooltip: true,
					description: 'Parameters for the exported file',
					paramItems: [
						{
							id: 'compression',
							label: 'Compressed',
							value: this.item.configuration_context.compression,
							default: 'None',
						},
						{
							id: 'field_delimiter',
							label: 'Field Delimiter',
							value: this.item.configuration_context.field_delimiter,
							default: '|',
						},
						{
							id: 'delete_dest_bucket_content',
							label: 'Delete Destination Storage Content',
							value: this.item.configuration_context.delete_dest_bucket_content,
							default: false,
						},
					],
				},
			},
			{
				component: 'parameters-list',
				props: {
					groupTitle: 'Source Table',
					tooltip: true,
					description: 'SQL executed to generate the dataset to export into file',
					paramItems: [
						{
							id: 'gcp_project',
							label: 'Bigquery Project ID',
							value: this.item.configuration_context.gcp_project,
						},
						{
							id: '',
							label: 'SQL File',
							component: 'sql-viewer',
							properties: {
								id: this.item.configuration_context.id,
								sql: this.item.sql_query,
							},
						},
						{
							id: 'copy_table',
							label: 'Keep Table',
							value: this.item.configuration_context.copy_table,
							default: false,
						},
					],
				},
			},
			{
				component: 'parameters-table',
				displayCondition: this.item.configuration_context.copy_table,
				props: {
					tableTitle: 'Destination Table',
					description: 'The Destination Table where the dataset will be keeped',
					columns: [
						{
							label: 'Type',
							field: 'source_type',
							width: '150px',
						},
						{
							label: 'Project ID',
							field: 'dest_gcp_project_id',
						},
						{
							label: 'Dataset',
							field: 'dest_gbq_dataset',
						},
						{
							label: 'Table Name',
							field: 'dest_gbq_table',
						},
						{
							label: 'Table Suffix',
							field: 'dest_gbq_table_suffix',
						},
					],
					rows: [
						{
							source_type: 'BigQuery',
							dest_gcp_project_id: this.item.configuration_context.dest_gcp_project_id,
							dest_gbq_dataset: this.item.configuration_context.dest_gbq_dataset,
							dest_gbq_table: this.item.configuration_context.dest_gbq_table,
							dest_gbq_table_suffix: this.item.configuration_context.dest_gbq_table_suffix,
						},
					],
					vflexLength: 'xs9',
					lineNumbers: false,
					searchOptionsEnabled: false,
				},
			},
			{
				component: 'parameters-list',
				props: {
					groupTitle: 'Update information',
					paramItems: [
						{
							id: 'updated_date',
							label: 'Updated date',
							value: this.$moment(
								this.item.configuration_context.update_date || this.item.configuration_context.updated_date,
								''
							).format('YYYY/MM/DD - HH:mm:ss'),
						},
						{
							id: 'updated_by',
							label: 'Updated by',
							value: this.item.configuration_context.updated_by,
						},
					],
				},
			},
		];
	}
}
</script>
