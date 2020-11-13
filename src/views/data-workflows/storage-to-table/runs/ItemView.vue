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
import { mirrorExcGcsToGbqRuns } from '@/store/modules/easy-firestore/mirror-exc-gcs-to-gbq-runs';

@Component
export default class StorageToTableRunsItemView extends Mixins(HeaderInfosMixin, RunDocMixin) {
	moduleName: string = mirrorExcGcsToGbqRuns.moduleName;

	get itemTabsItems() {
		if (Object.keys(this.item).length === 0) return [];

		return [
			this.runDetailsTab,
			this.configurationTab,
			{
				label: 'Schema',
				href: 'schema',
				component: {
					name: 'table-schema-view',
					props: {
						schemaRows: this.item.configuration_context.schema,
					},
				},
			},
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
					viewId: this.item.gbq_table_refreshed,
					viewType: 'run',
					runStatus: this.item.status,
				},
			},
			{
				component: 'parameters-list',
				props: {
					groupTitle: 'Context',
					tooltip: true,
					description: 'Context of the Storage to Table Run',
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
				component: 'parameters-list',
				props: {
					groupTitle: 'Source',
					tooltip: true,
					description: 'Source of the Storage to Table Run',
					paramItems: [
						{
							id: 'storage_type',
							label: 'Storage Type',
							value: 'Google Cloud Storage',
						},
						{
							id: 'source_bucket',
							label: 'Source Storage ID',
							value: this.item.source_bucket,
						},
						{
							id: 'gcs_prefix',
							label: 'Source Folder',
							value: this.item.gcs_prefix,
						},
						{
							id: 'filename_template',
							label: 'Filename Matched',
							value: this.item.filename_template,
						},
						{
							id: 'gcs_triggering_file',
							label: 'File Triggered',
							value: this.item.gcs_triggering_file,
						},
					],
				},
			},
			{
				component: 'parameters-list',
				props: {
					groupTitle: 'Destination',
					tooltip: true,
					description: 'Destination of the Storage to Table Run',
					paramItems: [
						{
							id: 'database_type',
							label: 'Database Type',
							value: 'Google Big Query',
						},
						{
							id: 'gbq_project',
							label: 'GCP Project ID',
							value: this.item.configuration_context.gcp_project,
						},
						{
							id: 'gbq_dataset',
							label: 'Big Query Dataset',
							value: this.item.configuration_context.gbq_dataset,
						},
						{
							id: 'gbq_destination_table',
							label: 'Destination Table',
							value: this.item.configuration_context.table_name,
						},
						{
							id: 'gbq_table_refreshed',
							label: 'Table refreshed',
							value: this.item.gbq_table_refreshed,
						},
					],
				},
			},
			{
				component: 'parameters-list',
				props: {
					groupTitle: 'Run Details',
					tooltip: true,
					description: 'Details of the Storage to Table Run',
					paramItems: [
						{
							id: 'dag_id',
							label: 'Dag Id',
							value: this.item.dag_id,
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
							label: 'Dag Run Id',
							value: this.item.dag_run_id,
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
					collection: this.moduleName,
					activeHeader: false,
					viewId: `${this.item.source_bucket}/${this.item.configuration_context.filename_template}`,
					viewType: 'conf',
					description: this.item.configuration_context.table_description
						? this.item.configuration_context.table_description
						: '⚠ Please, add a table description in the configuration file',
				},
			},
			{
				component: 'parameters-list',
				props: {
					groupTitle: 'Context',
					tooltip: true,
					description: 'Context of the Storage to Table configuration',
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
							id: 'filetemplate',
							label: 'File Name Template',
							value: this.item.id,
						},
					],
				},
			},
			{
				component: 'parameters-table',
				props: {
					tableTitle: 'Source Storage',
					description: 'Source Storage of files to load',
					columns: [
						{
							label: 'Type',
							field: 'source_type',
							width: '100px',
						},
						{
							label: 'Storage ID',
							field: 'source_storage_id',
							width: '200px',
						},
						{
							label: 'Source Folder',
							field: 'source_input_folder',
							width: '200px',
						},
						{
							label: 'Archive Folder',
							field: 'source_archive_folder',
							width: '200px',
						},
					],
					rows: [
						{
							source_type: 'GCS',
							source_storage_id: this.item.source_bucket,
							source_input_folder: this.item.gcs_prefix,
							source_archive_folder: this.item.configuration_context.archive_prefix,
						},
					],
					vflexLength: 'xs9',
					lineNumbers: false,
					searchOptionsEnabled: false,
				},
			},
			{
				component: 'parameters-table',
				props: {
					tableTitle: 'Destination Table',
					description: 'The destination table for the file to load',
					columns: [
						{
							label: 'GCP Project',
							field: 'gcp_project',
							width: '150px',
						},
						{
							label: 'Dataset',
							field: 'gbq_dataset',
							width: '150px',
						},
						{
							label: 'Destination Table',
							field: 'table_name',
							width: '200px',
						},
					],
					rows: [
						{
							gcp_project: this.item.configuration_context.gcp_project,
							gbq_dataset: this.item.configuration_context.gbq_dataset,
							table_name: this.item.configuration_context.table_name,
						},
					],
					vflexLength: 'xs7',
					lineNumbers: false,
					searchOptionsEnabled: false,
				},
			},
			{
				component: 'parameters-list',
				props: {
					groupTitle: 'Parameters',
					tooltip: true,
					description: 'Main Storage to Table parameters',
					paramItems: [
						{
							id: 'create_disposition',
							label: 'Create Disposition',
							value: this.item.configuration_context.create_disposition,
						},
						{
							id: 'field_delimiter',
							label: 'Field Delimiter',
							value: this.item.configuration_context.field_delimiter,
						},
						{
							id: 'skip_leading_rows',
							label: 'Skip Leading Rows',
							value: this.item.configuration_context.skip_leading_rows,
						},
						{
							id: 'source_format',
							label: 'Source Format',
							value: this.item.configuration_context.source_format,
						},
						{
							id: 'write_disposition',
							label: 'Write Disposition',
							value: this.item.configuration_context.write_disposition,
						},
					],
				},
			},
			{
				component: 'parameters-list',
				props: {
					groupTitle: 'Options',
					tooltip: true,
					description: 'Storage to Table optional configurations',
					paramItems: [
						{
							id: 'bq_load_job_ignore_unknown_values',
							label: 'Ignore extra values',
							value: this.item.bq_load_job_ignore_unknown_values,
							default: false,
							description: 'Ignore extra values not represented in the table schema.',
						},
						{
							id: 'bq_load_job_max_bad_records',
							label: 'Max bad records',
							value: this.item.bq_load_job_max_bad_records,
							default: '0',
							description: 'Number of invalid rows to ignore.',
						},
						{
							id: 'bq_load_job_quote_character',
							label: 'Quote Character',
							value: this.item.bq_load_job_quote_character,
							default: `"`,
						},
						{
							id: 'bq_load_job_schema_update_options',
							label: 'Schema Update Options',
							value: this.item.bq_load_job_schema_update_options,
							default: '[ ]',
							description:
								'Specifies updates to the destination table schema to allow as a side effect of the load job.',
						},
						{
							id: 'bq_load_job_null_marker',
							label: 'Null Marker',
							value: this.item.bq_load_job_null_marker,
							default: '""',
							description: 'Represents a null value (CSV only).',
						},
						{
							id: 'bq_load_job_allow_quoted_newlines',
							label: 'Allow quoted new lines',
							value: this.item.bq_load_job_allow_quoted_newlines,
							default: false,
							description: 'Allow quoted data containing newline characters (CSV only).',
						},
						{
							id: 'bq_load_job_allow_jagged_rows',
							label: 'Allow jagged rows',
							value: this.item.bq_load_job_allow_jagged_rows,
							default: false,
							description: 'Allow missing trailing optional columns (CSV only).',
						},
					],
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
