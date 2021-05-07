<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<item-component v-bind="configurationProps" />
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { ConfigurationTab, FullJSONTab, NotesTab } from '@/types';

import HeaderInfosMixin from '../header-infos';
import ConfigurationDocMixin from '@/mixins/data-workflows/doc/configuration-doc-mixin';

import { xmlConversionConf } from '@/store/modules/easy-firestore/xml-conversion-conf';
import { xmlConversionConfArchive } from '@/store/modules/easy-firestore/xml-conversion-conf-archive';
import DirectExecutionIcon from '@/components/data-workflows/common/item/parameters/custom-parameters-item/DirectExecutionIcon.vue';

@Component
export default class TailerContextConfItemView extends Mixins(HeaderInfosMixin, ConfigurationDocMixin) {
	moduleName: string = xmlConversionConf.moduleName;
	archivedConfsModuleName: string = xmlConversionConfArchive.moduleName;

	get itemTabsItems() {
		if (Object.keys(this.item).length === 0) return [];
		return [this.configurationTab, this.fullJSONTab, this.notesTab];
	}

	get configurationData() {
		return [
			{
				component: 'view-header',
				props: {
					item: this.item,
					collection: this.moduleName,
					activeHeader: true,
					viewId: this.item.configuration_id,
					viewType: 'conf',
				},
			},
			{
				component: 'parameters-list',
				props: {
					groupTitle: 'Context',
					tooltip: true,
					description: 'Context of the Storage to Storage configuration',
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
								directExecution: this.item.direct_execution,
							},
						},
					],
				},
			},
			{
				component: 'parameters-table',
				props: {
					tableTitle: 'XML Storage',
					description: 'Storage where the XML files are located',
					columns: [
						{
							label: 'Type',
							field: 'type',
						},
						{
							label: 'Project ID',
							field: 'gcp_project_id',
						},
						{
							label: 'Storage ID',
							field: 'gcs_bucket',
						},
						{
							label: 'Working Directory',
							field: 'gcs_working_directory',
						},
					],
					rows: [
						{
							type: 'GCS',
							gcp_project_id: this.item.gcp_project_id,
							gcs_bucket: this.item.gcs_bucket,
							gcs_working_directory: this.item.gcs_working_directory,
						},
					],
				},
			},
			{
				component: 'parameters-table',
				props: {
					tableTitle: 'XML Files',
					description: 'XML Files to convert',
					columns: [
						{
							label: 'XML Template',
							field: 'filename_template',
						},
						{
							label: 'XML Description',
							field: 'file_description',
						},
						{
							label: 'XSD Schema File',
							field: 'xsd_schema_file',
						},
						{
							label: 'Filters',
							field: 'output_suffix_filters',
						},
					],
					rows: this.item.filename_templates.map((filenameTemplate) => ({
						filename_template: filenameTemplate.filename_template,
						file_description: filenameTemplate.file_description,
						xsd_schema_file: filenameTemplate.xsd_schema_file,
						output_suffix_filters: filenameTemplate.output_suffix_filters.length,
					})),
					searchOptionsEnabled: true,
				},
			},
		];
	}
}
</script>
