<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<item-component v-bind="configurationProps" />
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { AnyObject, DestinationStorageRows } from '@/types';

import HeaderInfosMixin from '../header-infos';
import ConfigurationDocMixin from '@/mixins/data-workflows/doc/configuration-doc-mixin';

import { storageToStorageConfs } from '@/store/modules/easy-firestore/storage-to-storage-confs';
import { storageToStorageConfsArchive } from '@/store/modules/easy-firestore/storage-to-storage-confs-archive';

@Component
export default class StorageToStorageConfigurationsItemView extends Mixins(HeaderInfosMixin, ConfigurationDocMixin) {
	moduleName: string = storageToStorageConfs.moduleName;
	archivedConfsModuleName: string = storageToStorageConfsArchive.moduleName;

	getSourceStorageColumns() {
		let sourceStorageColumns = {};

		switch (this.item.source.type) {
			case 'gcs':
				sourceStorageColumns = [
					{
						label: 'Type',
						field: 'type',
						width: '100px',
					},
					{
						label: 'Source Bucket',
						field: 'gcs_source_bucket',
						width: '200px',
					},
					{
						label: 'Source Folder',
						field: 'gcs_source_prefix',
						width: '200px',
					},
					{
						label: 'Archive Folder',
						field: 'gcs_archive_prefix',
						width: '200px',
					},
				];
				break;
			case 's3':
				// TODO: Define array
				sourceStorageColumns = [];
				break;
			case 'sftp':
				// TODO: Define array
				sourceStorageColumns = [];
				break;
		}

		return sourceStorageColumns;
	}

	getSourceStorageRows() {
		let source_type: string = this.item.source.type;
		let sourceStorageRow: AnyObject = {};

		switch (source_type) {
			case 'gcs':
				// sourceStorage attribut for GCS bucket
				sourceStorageRow.type = this.item.source.type;
				sourceStorageRow.gcs_source_bucket = this.item.source.gcs_source_bucket;
				sourceStorageRow.gcs_source_prefix = this.item.source.gcs_source_prefix;
				sourceStorageRow.gcs_archive_prefix = this.item.source.gcs_archive_prefix;
				sourceStorageRow.gcp_credentials_secret = this.item.source.gcp_credentials_secret;
				break;
			case 's3':
				// sourceStorage attribut for S3 bucket
				sourceStorageRow.type = this.item.source.type;
				sourceStorageRow.aws_access_key = this.item.source.aws_access_key;
				sourceStorageRow.aws_access_key_secret = this.item.source.aws_access_key_secret;
				break;
			case 'sftp':
				// sourceStorage attribut for sftp folder
				sourceStorageRow.type = this.item.source.type;
				sourceStorageRow.sftp_source_filename = this.item.source.sftp_source_filename;
				sourceStorageRow.sftp_source_directory = this.item.source.sftp_source_directory;
				sourceStorageRow.sftp_host = this.item.source.sftp_host;
				sourceStorageRow.sftp_port = this.item.source.sftp_port;
				sourceStorageRow.sftp_userid = this.item.source.sftp_userid;
				sourceStorageRow.sftp_password_secret = this.item.source.sftp_password_secret;
				break;
		}

		return [sourceStorageRow];
	}

	getDestinationStorageRows() {
		// Build 3 arrays for each destination type (gcs,s3,sftp)
		let destinationStorageRows: DestinationStorageRows = { gcs: [], s3: [], sftp: [] };
		let gcsDestinationStorageRows = [];
		let s3DestinationStorageRows = [];
		let sftpDestinationStorageRows = [];

		for (var i = 0; i < this.item.destinations.length; i++) {
			switch (this.item.destinations[i].type) {
				case 'gcs':
					gcsDestinationStorageRows.push({
						type: this.item.destinations[i].type,
						gcs_destination_bucket: this.item.destinations[i].gcs_destination_bucket,
						gcs_destination_prefix: this.item.destinations[i].gcs_destination_prefix,
						gcp_credentials_secret: this.item.destinations[i].gcp_credentials_secret,
					});
					break;
				case 's3':
					s3DestinationStorageRows.push({
						type: this.item.destinations[i].type,
						s3_bucket: this.item.destinations[i].s3_bucket,
						s3_destination_prefix: this.item.destinations[i].s3_destination_prefix,
						aws_access_key: this.item.destinations[i].aws_access_key,
						aws_access_key_secret: this.item.destinations[i].aws_access_key_secret,
					});
					break;
				case 'sftp':
					sftpDestinationStorageRows.push({
						type: this.item.destinations[i].type,
						sftp_host: this.item.destinations[i].sftp_host,
						sftp_port: this.item.destinations[i].sftp_port,
						sftp_destination_dir: this.item.destinations[i].sftp_destination_dir,
						sftp_destination_dir_create: this.item.destinations[i].sftp_destination_dir_create,
						generate_top_file: this.item.destinations[i].generate_top_file,
						sftp_password_secret: this.item.destinations[i].sftp_password_secret,
					});
					break;
			}
		}

		destinationStorageRows.gcs = gcsDestinationStorageRows;
		destinationStorageRows.s3 = s3DestinationStorageRows;
		destinationStorageRows.sftp = sftpDestinationStorageRows;
		return destinationStorageRows;
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
					],
				},
			},
			{
				component: 'parameters-table',
				props: {
					tableTitle: 'Source Storage',
					description: 'Source Storage of the files to copy',
					columns: this.getSourceStorageColumns(),
					rows: this.getSourceStorageRows(),
					vflexLength: 'xs9',
					lineNumbers: false,
					searchOptionsEnabled: false,
				},
			},
			{
				component: 'parameters-table',
				displayCondition: this.getDestinationStorageRows().gcs.length > 0,
				props: {
					tableTitle: 'GCS Destinations',
					description: 'Multi GCS destinations for copied files',
					columns: [
						{
							label: 'Type',
							field: 'type',
							width: '100px',
						},
						{
							label: 'Destination Bucket',
							field: 'gcs_destination_bucket',
							width: '200px',
						},
						{
							label: 'Destination Folder',
							field: 'gcs_destination_prefix',
							width: '200px',
						},
					],
					rows: this.getDestinationStorageRows().gcs,
					vflexLength: 'xs10',
					lineNumbers: false,
					searchOptionsEnabled: false,
				},
			},
			{
				component: 'parameters-table',
				displayCondition: this.getDestinationStorageRows().s3.length > 0,
				props: {
					tableTitle: 'S3 Destinations',
					description: 'Multi S3 destinations for copied files',
					columns: [
						{
							label: 'Type',
							field: 'type',
							width: '100px',
						},
						{
							label: 'Destination S3 bucket',
							field: 's3_bucket',
							width: '200px',
						},
						{
							label: 'Destination Folder',
							field: 's3_destination_prefix',
							width: '200px',
						},
						{
							label: 'AWS Access Key',
							field: 'aws_access_key',
							width: '200px',
						},
					],
					rows: this.getDestinationStorageRows().s3,
					vflexLength: 'xs10',
					lineNumbers: false,
					searchOptionsEnabled: false,
				},
			},
			{
				component: 'parameters-table',
				displayCondition: this.getDestinationStorageRows().sftp.length > 0,
				props: {
					tableTitle: 'SFTP Destinations',
					description: 'Multi SFTP destinations for copied files',
					columns: [
						{
							label: 'Type',
							field: 'type',
							width: '50px',
						},
						{
							label: 'Host',
							field: 'sftp_host',
							width: '100px',
						},
						{
							label: 'Port',
							field: 'sftp_port',
							width: '50px',
						},
						{
							label: 'User',
							field: 'sftp_userid',
							width: '100px',
						},
						{
							label: ' Directory',
							field: 'sftp_destination_dir',
							width: '100px',
						},
						{
							label: 'Top File Name',
							field: 'generate_top_file',
							width: '100px',
						},
						{
							label: 'Create Dir',
							field: 'sftp_destination_dir_create',
							width: '100px',
						},
					],
					rows: this.getDestinationStorageRows().sftp,
					vflexLength: 'xs12',
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
							field: 'file_description',
						},
					],
					rows: this.item.filename_templates,
					vflexLength: 'xs12',
					lineNumbers: false,
					searchOptionsEnabled: false,
				},
			},
		];
	}
}
</script>
