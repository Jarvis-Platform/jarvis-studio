<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<item-component v-bind="runProps" />
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { AnyObject, DestinationStorageRows } from '@/types';
import HeaderInfosMixin from '../header-infos';
import RunDocMixin from '@/mixins/data-workflows/doc/run-doc-mixin';
import { storageToStorageRuns } from '@/store/modules/easy-firestore/storage-to-storage-runs';

@Component
export default class StorageToStorageRunsItemView extends Mixins(HeaderInfosMixin, RunDocMixin) {
	moduleName: string = storageToStorageRuns.moduleName;

	getSourceStorageColumns() {
		let sourceStorageColumns = {};

		switch (this.item.configuration_context.source.type) {
			case 'gcs':
				sourceStorageColumns = [
					{
						label: 'Type',
						field: 'type',
						width: '100px'
					},
					{
						label: 'Source Bucket',
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
				];
				break;
			case 's3':
				sourceStorageColumns = [
					{
						label: 'Type',
						field: 'type',
						width: '100px'
					},
					{
						label: 'AWS Access Key',
						field: 'aws_access_key',
						width: '200px'
					}
				];
				break;
			case 'sftp':
				sourceStorageColumns = [
					{
						label: 'Type',
						field: 'type',
						width: '100px'
					},
					{
						label: 'SFTP Host',
						field: 'sftp_host',
						width: '200px'
					},
					{
						label: 'SFTP Port',
						field: 'sftp_port',
						width: '50px'
					},
					{
						label: 'SFTP User',
						field: 'sftp_userid',
						width: '200px'
					},
					{
						label: 'Source Directory',
						field: 'sftp_source_directory',
						width: '200px'
					},
					{
						label: 'Source Filename',
						field: 'sftp_source_filename',
						width: '200px'
					}
				];
				break;
		}

		return sourceStorageColumns;
	}

	getSourceStorageRows() {
		let source_type = this.item.configuration_context.source.type;
		let sourceStorageRow: AnyObject = {};

		switch (source_type) {
			case 'gcs':
				// sourceStorage attribut for GCS bucket
				sourceStorageRow.type = this.item.configuration_context.source.type;
				sourceStorageRow.gcs_source_bucket = this.item.configuration_context.source.gcs_source_bucket;
				sourceStorageRow.gcs_source_prefix = this.item.configuration_context.source.gcs_source_prefix;
				sourceStorageRow.gcs_archive_prefix = this.item.configuration_context.source.gcs_archive_prefix;
				sourceStorageRow.gcp_credentials_secret = this.item.configuration_context.source.gcp_credentials_secret;
				break;
			case 's3':
				// sourceStorage attribut for S3 bucket
				sourceStorageRow.type = this.item.configuration_context.source.type;
				sourceStorageRow.aws_access_key = this.item.configuration_context.source.aws_access_key;
				sourceStorageRow.aws_access_key_secret = this.item.configuration_context.source.aws_access_key_secret;
				break;
			case 'sftp':
				// sourceStorage attribut for sftp folder
				sourceStorageRow.type = this.item.configuration_context.source.type;
				sourceStorageRow.sftp_source_filename = this.item.configuration_context.source.sftp_source_filename;
				sourceStorageRow.sftp_source_directory = this.item.configuration_context.source.sftp_source_directory;
				sourceStorageRow.sftp_host = this.item.configuration_context.source.sftp_host;
				sourceStorageRow.sftp_port = this.item.configuration_context.source.sftp_port;
				sourceStorageRow.sftp_userid = this.item.configuration_context.source.sftp_userid;
				sourceStorageRow.sftp_password_secret = this.item.configuration_context.source.sftp_password_secret;
				break;
		}

		return [sourceStorageRow];
	}

	getDestinationStorageRows() {
		// Build 3 arrays for each destination type (gcs,s3,sftp)
		let destinationStorageRows: DestinationStorageRows = { gcs: [], s3: [], sftp: [] };
		let gcsDestinationStorageRows: Object[] = [];
		let s3DestinationStorageRows = [];
		let sftpDestinationStorageRows = [];

		for (let i = 0; i < this.item.configuration_context.destinations.length; i++) {
			switch (this.item.configuration_context.destinations[i].type) {
				case 'gcs':
					gcsDestinationStorageRows.push({
						type: this.item.configuration_context.destinations[i].type,
						gcs_destination_bucket: this.item.configuration_context.destinations[i].gcs_destination_bucket,
						gcs_destination_prefix: this.item.configuration_context.destinations[i].gcs_destination_prefix,
						gcp_credentials_secret: this.item.configuration_context.destinations[i].gcp_credentials_secret
					});
					break;
				case 's3':
					s3DestinationStorageRows.push({
						type: this.item.configuration_context.destinations[i].type,
						s3_bucket: this.item.configuration_context.destinations[i].s3_bucket,
						s3_destination_prefix: this.item.configuration_context.destinations[i].s3_destination_prefix,
						aws_access_key: this.item.configuration_context.destinations[i].aws_access_key,
						aws_access_key_secret: this.item.configuration_context.destinations[i].aws_access_key_secret
					});
					break;
				case 'sftp':
					sftpDestinationStorageRows.push({
						type: this.item.configuration_context.destinations[i].type,
						sftp_host: this.item.configuration_context.destinations[i].sftp_host,
						sftp_port: this.item.configuration_context.destinations[i].sftp_port,
						sftp_destination_dir: this.item.configuration_context.destinations[i].sftp_destination_dir,
						sftp_destination_dir_create: this.item.configuration_context.destinations[i].sftp_destination_dir_create,
						generate_top_file: this.item.configuration_context.destinations[i].generate_top_file,
						sftp_password_secret: this.item.configuration_context.destinations[i].sftp_password_secret
					});
					break;
			}
		}
		destinationStorageRows.gcs = gcsDestinationStorageRows;
		destinationStorageRows.s3 = s3DestinationStorageRows;
		destinationStorageRows.sftp = sftpDestinationStorageRows;
		return destinationStorageRows;
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
					viewId: this.item.id,
					viewType: 'run',
					runStatus: this.item.status
				}
			},
			{
				component: 'parameters-list',
				props: {
					groupTitle: 'Run Details',
					tooltip: true,
					description: 'Details of the Storage to Storage run',
					paramItems: [
						{
							id: 'account',
							label: 'Account',
							value: this.item.account
						},
						{
							id: 'environment',
							label: 'Environnement',
							value: this.item.environment
						},
						{
							id: 'matching_filename_template',
							label: 'Filename Matched',
							value: this.item.matching_filename_template
						},
						{
							id: 'triggering_file',
							label: 'File Triggered',
							value: this.item.triggering_file
						},
						{
							id: 'dag_id',
							label: 'Configuration Type',
							value: this.item.dag_id
						},
						{
							id: 'source_storage',
							label: 'Source Storage',
							value: this.item.source_storage
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
					activeHeader: false,
					viewId: this.item.configuration_id,
					viewType: 'conf'
				}
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
					description: 'Source Storage of files to copy',
					columns: this.getSourceStorageColumns(),
					rows: this.getSourceStorageRows(),
					vflexLength: 'xs10',
					lineNumbers: false,
					searchOptionsEnabled: false
				}
			},
			{
				component: 'parameters-table',
				props: {
					tableTitle: 'GCS Destinations',
					description: 'Multi GCS destinations for copied files',
					columns: [
						{
							label: 'Type',
							field: 'type',
							width: '100px'
						},
						{
							label: 'Destination Bucket',
							field: 'gcs_destination_bucket',
							width: '200px'
						},
						{
							label: 'Destination Folder',
							field: 'gcs_destination_prefix',
							width: '200px'
						}
					],
					rows: this.getDestinationStorageRows().gcs,
					vflexLength: 'xs10',
					lineNumbers: false,
					searchOptionsEnabled: false
				}
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
							field: 'filename_template'
						},
						{
							label: 'File Name Description',
							field: 'file_description'
						}
					],
					rows: this.item.configuration_context.filename_templates,
					vflexLength: 'xs12',
					lineNumbers: false,
					searchOptionsEnabled: false
				}
			},
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
