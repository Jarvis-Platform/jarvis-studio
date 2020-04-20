<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<item-component v-bind="configurationProps" />
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { State } from 'vuex-class';

import HeaderInfosMixin from '../header-infos';
import ConfigurationDocMixin from '@/mixins/data-workflows/doc/configuration-doc-mixin';

import { mirrorExcGcsToGbqConfs } from '@/store/modules/easy-firestore/mirror-exc-gcs-to-gbq-confs';
import { mirrorExcGcsToGbqConfArchive } from '@/store/modules/easy-firestore/mirror-exc-gcs-to-gbq-conf-archive';

@Component
export default class StorageToTableConfigurationsItemView extends Mixins(HeaderInfosMixin, ConfigurationDocMixin) {
	moduleName: string = mirrorExcGcsToGbqConfs.moduleName;
	archivedConfsModuleName: string = mirrorExcGcsToGbqConfArchive.moduleName;

	@State(state => state.storageToTableConf.data) storageToTableConf!: Object;

	// Override of `getItem` method in DocMixin to fetch item with custom firestore path
	async getItem() {
		await this.$store.dispatch('storageToTableConf/closeDBChannel', { clearModule: true });
		await this.$store.dispatch('storageToTableConf/fetchAndAdd', {
			sourceId: this.bucketId,
			itemId: this.itemId
		});

		this.item = this.storageToTableConf;
		this.isLoading = false;
	}

	get bucketId() {
		return this.$route.params.bucketId;
	}

	get itemTabsItems() {
		if (Object.keys(this.item).length === 0) return [];

		return [
			this.configurationTab,
			{
				label: 'Schema',
				href: 'schema',
				component: {
					name: 'table-schema-view',
					props: {
						schemaRows: this.item.schema
					}
				}
			},
			this.fullJSONTab,
			this.notesTab
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
					viewId: this.item.table_name,
					viewType: 'conf',
					description: this.item.table_description
						? this.item.table_description
						: '⚠ Please, add a table description in the configuration file'
				}
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
							value: this.item.account
						},
						{
							id: 'environment',
							label: 'Environment',
							value: this.item.environment
						},
						{
							id: 'filetemplate',
							label: 'File Name Template',
							value: this.item.id
						}
					]
				}
			},
			{
				component: 'parameters-table',
				props: {
					tableTitle: 'Source Storage',
					description: 'Source Storage of the file to load',
					columns: [
						{
							label: 'Type',
							field: 'source_type',
							width: '100px'
						},
						{
							label: 'Storage ID',
							field: 'source_storage_id',
							width: '200px'
						},
						{
							label: 'Source Folder',
							field: 'source_input_folder',
							width: '200px'
						},
						{
							label: 'Archive Folder',
							field: 'source_archive_folder',
							width: '200px'
						}
					],
					rows: [
						{
							source_type: 'GCS',
							source_storage_id: this.item.source_bucket,
							source_input_folder: this.item.gcs_prefix,
							source_archive_folder: this.item.archive_prefix
						}
					],
					lineNumbers: false,
					searchOptionsEnabled: false
				}
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
							width: '150px'
						},
						{
							label: 'Dataset',
							field: 'gbq_dataset',
							width: '150px'
						},
						{
							label: 'Destination Table',
							field: 'table_name',
							width: '200px'
						}
					],
					rows: [
						{
							gcp_project: this.item.gcp_project,
							gbq_dataset: this.item.gbq_dataset,
							table_name: this.item.table_name
						}
					],
					lineNumbers: false,
					searchOptionsEnabled: false
				}
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
							value: this.item.create_disposition
						},
						{
							id: 'field_delimiter',
							label: 'Field Delimiter',
							value: this.item.field_delimiter
						},
						{
							id: 'skip_leading_rows',
							label: 'Skip Leading Rows',
							value: this.item.skip_leading_rows
						},
						{
							id: 'source_format',
							label: 'Source Format',
							value: this.item.source_format
						},
						{
							id: 'write_disposition',
							label: 'Write Disposition',
							value: this.item.write_disposition
						}
					]
				}
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
							description: 'Ignore extra values not represented in the table schema.'
						},
						{
							id: 'bq_load_job_max_bad_records',
							label: 'Max bad records',
							value: this.item.bq_load_job_max_bad_records,
							default: '0',
							description: 'Number of invalid rows to ignore.'
						},
						{
							id: 'bq_load_job_quote_character',
							label: 'Quote Character',
							value: this.item.bq_load_job_quote_character,
							default: `"`
						},
						{
							id: 'bq_load_job_schema_update_options',
							label: 'Schema Update Options',
							value: this.item.bq_load_job_schema_update_options,
							default: '[ ]',
							description:
								'Specifies updates to the destination table schema to allow as a side effect of the load job.'
						},
						{
							id: 'bq_load_job_null_marker',
							label: 'Null Marker',
							value: this.item.bq_load_job_null_marker,
							default: '""',
							description: 'Represents a null value (CSV only).'
						},
						{
							id: 'bq_load_job_allow_quoted_newlines',
							label: 'Allow quoted new lines',
							value: this.item.bq_load_job_allow_quoted_newlines,
							default: false,
							description: 'Allow quoted data containing newline characters (CSV only).'
						},
						{
							id: 'bq_load_job_allow_jagged_rows',
							label: 'Allow jagged rows',
							value: this.item.bq_load_job_allow_jagged_rows,
							default: false,
							description: 'Allow missing trailing optional columns (CSV only).'
						}
					]
				}
			}
		];
	}
}
</script>
