import { HeaderItem } from '@/types';

// GENERAL
export const ACCOUNT: HeaderItem = { text: 'Account ID', sortable: true, value: 'account' };
export const ENVIRONMENT: HeaderItem = { text: 'Environment', sortable: true, value: 'environment' };
export const ACTIONS: HeaderItem = { text: 'Actions', sortable: false, value: 'actions' };

// RUNS
export const DESTINATION_BUCKET: HeaderItem = {
	text: 'Destination Bucket',
	sortable: true,
	value: 'destination_bucket',
};
export const SOURCE_BUCKET: HeaderItem = { text: 'Source Bucket', sortable: true, value: 'source_bucket' };
export const GCS_TRIGGERING_FILE: HeaderItem = { text: 'File', sortable: true, value: 'gcs_triggering_file' };
export const STATUS: HeaderItem = { text: 'Status', sortable: true, value: 'status' };
export const DAG_EXECUTION_DATE: HeaderItem = { text: 'Execution Date', sortable: true, value: 'dag_execution_date' };
export const CONFIGURATION_ID: HeaderItem = { text: 'Conf Id', sortable: true, value: 'configuration_id' };
export const TRIGGERING_FILE: HeaderItem = { text: 'Triggering File', sortable: true, value: 'triggering_file' };
export const NB_FILENAME_TEMPLATES: HeaderItem = {
	text: 'Nb File Templates',
	sortable: true,
	value: 'filename_templates.length',
};
export const GBQ_TABLE_REFRESHED: HeaderItem = {
	text: 'Destination Table',
	sortable: true,
	value: 'gbq_table_refreshed',
};
export const FIRESTORE_CONF_DOC_ID: HeaderItem = {
	text: 'Configuration Id',
	sortable: true,
	value: 'firestore_conf_doc_id',
};
export const OUTPUT_FILENAME: HeaderItem = { text: 'Generated File', sortable: true, value: 'output_filename' };
export const DAG_ID: HeaderItem = { text: 'Configuration Id', sortable: true, value: 'dag_id' };
export const WORKFLOW_LENGTH: HeaderItem = {
	text: 'Tasks',
	sortable: true,
	value: 'configuration_context.configuration.workflow.length',
};

// CONFIGURATIONS
export const ID: HeaderItem = { text: 'Configuration id', sortable: true, value: 'id' };
export const PARAMETERS: HeaderItem = { text: 'Parameters', sortable: true, value: 'parameters' };
export const ACTIVATED: HeaderItem = { text: 'Status', sortable: true, value: 'activated' };
export const NB_DESTINATION_BUCKET: HeaderItem = {
	text: 'Nb Destination Buckets',
	sortable: true,
	value: 'destination_bucket.length',
};
export const TABLE_NAME: HeaderItem = { text: 'Destination Table', sortable: true, value: 'table_name' };
export const GCP_PROJECT: HeaderItem = { text: 'BQ Project ID', sortable: true, value: 'gcp_project' };
export const GCP_PROJECT_ID: HeaderItem = { text: 'GCP Project ID', sortable: true, value: 'gcp_project_id' };
export const GBQ_DATASET: HeaderItem = { text: 'BQ Dataset', sortable: true, value: 'gbq_dataset' };
export const GCS_BUCKET: HeaderItem = { text: 'GCS Bucket', sortable: true, value: 'gcs_bucket' };
export const GCS_DEST_BUCKET: HeaderItem = { text: 'Destination Bucket', sortable: true, value: 'gcs_dest_bucket' };
export const GCS_DEST_PREFIX: HeaderItem = { text: 'Destination Prefix', sortable: true, value: 'gcs_dest_prefix' };
export const GCS_WORKING_DIRECTORY: HeaderItem = {
	text: 'GCS Working Directory',
	sortable: true,
	value: 'gcs_working_directory',
};
export const DEFAULT_BQ_DATASET: HeaderItem = {
	text: 'BQ Default Dataset',
	sortable: true,
	value: 'configuration.default_bq_dataset',
};
export const CONF_WORKFLOW_LENGTH: HeaderItem = {
	text: '# Tasks',
	sortable: true,
	value: 'configuration.workflow.length',
};
export const GCS_FILE_EXCHANGE_BUCKET: HeaderItem = {
	text: 'Bucket Exchange',
	sortable: true,
	value: 'gcs_file_exchange_bucket',
};
export const WORKING_DIR: HeaderItem = { text: 'Working Directory', sortable: true, value: 'working_dir' };
export const TARGET_DAG: HeaderItem = { text: 'Job to fire', sortable: true, value: 'target_dag' };
export const AUTHORIZED_JOB_IDS_LENGTH: HeaderItem = {
	text: 'Nb triggering Jobs',
	sortable: true,
	value: 'authorized_job_ids.length',
};

// Status
export const JOBS: HeaderItem = { text: 'Triggering Jobs', sortable: true, value: 'jobs' };
export const TRIGGERED_JOBS: HeaderItem = { text: 'Triggered Jobs', sortable: true, value: 'triggered_jobs' };
export const LAST_UPDATE_FROM_NOW: HeaderItem = {
	text: 'Last triggering date',
	sortable: true,
	value: 'last_update_date_from_now',
};
export const LAST_FIRE_DATE_FROM_NOW: HeaderItem = {
	text: 'Last fire Date',
	sortable: true,
	value: 'last_fire_date_from_now',
};

export default {
	// GENERAL
	ACCOUNT,
	ENVIRONMENT,
	ACTIONS,

	// RUNS
	DESTINATION_BUCKET,
	SOURCE_BUCKET,
	GCS_TRIGGERING_FILE,
	STATUS,
	DAG_EXECUTION_DATE,
	CONFIGURATION_ID,
	TRIGGERING_FILE,
	NB_FILENAME_TEMPLATES,
	GBQ_TABLE_REFRESHED,
	FIRESTORE_CONF_DOC_ID,
	OUTPUT_FILENAME,
	DAG_ID,
	WORKFLOW_LENGTH,

	// CONFIGURATIONS
	ID,
	ACTIVATED,
	NB_DESTINATION_BUCKET,
	TABLE_NAME,
	GCP_PROJECT,
	GBQ_DATASET,
	GCS_DEST_BUCKET,
	GCS_DEST_PREFIX,
	DEFAULT_BQ_DATASET,
	CONF_WORKFLOW_LENGTH,
	GCS_FILE_EXCHANGE_BUCKET,
	WORKING_DIR,
	TARGET_DAG,
	AUTHORIZED_JOB_IDS_LENGTH,

	// STATUS
	JOBS,
	TRIGGERED_JOBS,
	LAST_UPDATE_FROM_NOW,
	LAST_FIRE_DATE_FROM_NOW,
};
