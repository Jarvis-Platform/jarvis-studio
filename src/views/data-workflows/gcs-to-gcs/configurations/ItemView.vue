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

import { mirrorExcGcsToGcsConfs } from '@/store/modules/easy-firestore/mirror-exc-gcs-to-gcs-confs';
import { mirrorExcGcsToGcsConfsArchive } from '@/store/modules/easy-firestore/mirror-exc-gcs-to-gcs-confs-archive';

@Component
export default class GcsToGcsConfigurationsItemView extends Mixins(HeaderInfosMixin, ConfigurationDocMixin) {
	moduleName: string = mirrorExcGcsToGcsConfs.moduleName;
	archivedConfsModuleName: string = mirrorExcGcsToGcsConfsArchive.moduleName;

	getDestinationStorageRows() {
		let destinationStorageRows = [];

		for (let i = 0; i < this.item.destination_bucket.length; i++) {
			destinationStorageRows.push({
				destination_type: 'GCS',
				destination_storage_id: this.item.destination_bucket[i],
				destination_input_folder: this.item.destination_gcs_prefix[i],
			});
		}

		return destinationStorageRows;
	}

	getFileNameTemplateRows() {
		return this.item.filename_templates.map((filename: string) => {
			return {
				filename_template: filename,
				filename_description: 'No Description',
			};
		});
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
					description: null,
				},
			},
			{
				component: 'parameters-list',
				props: {
					groupTitle: 'Context',
					tooltip: true,
					description: 'Context of the GCS to GCS configuration',
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
					tableTitle: 'Source Storage',
					description: 'Source Storage of the files to copy',
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
							source_input_folder: this.item.source_gcs_prefix,
							source_archive_folder: this.item.source_archive_prefix,
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
					tableTitle: 'Destination Storage(s)',
					description: 'Multi destination storages for the copied files',
					columns: [
						{
							label: 'Type',
							field: 'destination_type',
							width: '100px',
						},
						{
							label: 'Storage ID',
							field: 'destination_storage_id',
							width: '200px',
						},
						{
							label: 'Destination Folder',
							field: 'destination_input_folder',
							width: '230px',
						},
					],
					rows: this.getDestinationStorageRows(),
					vflexLength: 'xs7',
					lineNumbers: false,
					searchOptionsEnabled: false,
				},
			},
			{
				component: 'parameters-table',
				props: {
					tableTitle: 'File Name Template(s)',
					description:
						'Templates of the incomming files that should be copied to the destination storages. Do not put the date/timestamp prefix file in the template',
					columns: [
						{
							label: 'File Name Template',
							field: 'filename_template',
						},
						{
							label: 'File Name Description',
							field: 'filename_description',
						},
					],
					rows: this.getFileNameTemplateRows(),
					vflexLength: 'xs9',
					lineNumbers: false,
					searchOptionsEnabled: false,
				},
			},
		];
	}
}
</script>
