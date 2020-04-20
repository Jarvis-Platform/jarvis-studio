type RouteName = string;

/* APP */
export const HOME: RouteName = 'home';
export const NO_ACCOUNT: RouteName = 'no-account';
export const NOT_FOUND: RouteName = 'not-found';

/* AUTH */
export const SIGN_IN: RouteName = 'sign-in';
export const LOGOUT: RouteName = 'logout';

/* DATA MODELS */
export const TABLES_LISTING: RouteName = 'tables-listing';
export const DATA_TABLE_DETAILS: RouteName = 'table-details.vue';

/* DATA WORKFLOWS */
export const GCS_TO_GCS_RUNS_LISTING: RouteName = 'gcs-to-gcs-runs-listing';
export const GCS_TO_GCS_RUNS_ITEM: RouteName = 'gcs-to-gcs-runs-item';
export const GCS_TO_GCS_CONFIGURATIONS_LISTING: RouteName = 'gcs-to-gcs-confs-listing';
export const GCS_TO_GCS_CONFIGURATIONS_ITEM: RouteName = 'gcs-to-gcs-confs-item';

export const STORAGE_TO_STORAGE_RUNS_LISTING: RouteName = 'storage-to-storage-runs-listing';
export const STORAGE_TO_STORAGE_RUNS_ITEM: RouteName = 'storage-to-storage-runs-item';
export const STORAGE_TO_STORAGE_CONFIGURATIONS_LISTING: RouteName = 'storage-to-storage-confs-listing';
export const STORAGE_TO_STORAGE_CONFIGURATIONS_ITEM: RouteName = 'storage-to-storage-conf-item';

export const STORAGE_TO_TABLE_RUNS_LISTING: RouteName = 'storage-to-table-runs-listing';
export const STORAGE_TO_TABLE_RUNS_ITEM: RouteName = 'storage-to-table-runs-item';
export const STORAGE_TO_TABLE_CONFIGURATIONS_LISTING: RouteName = 'storage-to-table-confs-listing';
export const STORAGE_TO_TABLE_CONFIGURATIONS_ITEM: RouteName = 'storage-to-table-confs-item';

export const STORAGE_TO_TABLES_RUNS_LISTING: RouteName = 'storage-to-tables-runs-listing';
export const STORAGE_TO_TABLES_RUNS_ITEM: RouteName = 'storage-to-tables-runs-item';
export const STORAGE_TO_TABLES_CONFIGURATIONS_LISTING: RouteName = 'storage-to-tables-configurations-listing';
export const STORAGE_TO_TABLES_CONFIGURATIONS_ITEM: RouteName = 'storage-to-tables-configurations-item';

export const TABLES_TO_TABLES_RUNS_LISTING: RouteName = 'tables-to-tables-runs-listing';
export const TABLES_TO_TABLES_RUNS_ITEM: RouteName = 'tables-to-tables-runs-item';
export const TABLES_TO_TABLES_CONFIGURATIONS_LISTING: RouteName = 'tables-to-tables-confs-listing';
export const TABLES_TO_TABLES_CONFIGURATIONS_ITEM: RouteName = 'tables-to-tables-conf-item';

export const GBQ_TO_GCS_RUNS_LISTING: RouteName = 'gbq-to-gcs-runs-listing';
export const GBQ_TO_GCS_RUNS_ITEM: RouteName = 'gbq-to-gcs-runs-item';
export const GBQ_TO_GCS_CONFIGURATIONS_LISTING: RouteName = 'gbq-to-gcs-confs-listing';
export const GBQ_TO_GCS_CONFIGURATIONS_ITEM: RouteName = 'gbq-to-gcs-confs-item';

export const TABLE_TO_STORAGE_RUNS_LISTING: RouteName = 'table-to-storage-runs-listing';
export const TABLE_TO_STORAGE_RUNS_ITEM: RouteName = 'table-to-storage-runs-item';
export const TABLE_TO_STORAGE_CONFIGURATIONS_LISTING: RouteName = 'table-to-storage-confs-listing';
export const TABLE_TO_STORAGE_CONFIGURATIONS_ITEM: RouteName = 'table-to-storage-confs-item';

export const VM_LAUNCHER_RUNS_LISTING: RouteName = 'vm-launcher-runs-listing';
export const VM_LAUNCHER_RUNS_ITEM: RouteName = 'vm-launcher-runs-item';
export const VM_LAUNCHER_CONFIGURATIONS_LISTING: RouteName = 'vm-launcher-confs-listing';
export const VM_LAUNCHER_CONFIGURATIONS_ITEM: RouteName = 'vm-launcher-confs-item';

export const WORKFLOW_STATUS_LISTING: RouteName = 'workflow-status-listing';
export const WORKFLOW_STATUS_ITEM: RouteName = 'workflow-status-item';
export const WORKFLOW_CONFIGURATIONS_LISTING: RouteName = 'workflow-confs-listing';
export const WORKFLOW_CONFIGURATIONS_ITEM: RouteName = 'workflow-confs-item';

/* SETTINGS */
export const PROFILE: RouteName = 'user-profile';
export const USERS: RouteName = 'users';
export const ACCOUNTS: RouteName = 'accounts';
export const CLOUD_FUNCTIONS: RouteName = 'gcp-cloud-functions';

export default {
	NOT_FOUND,
	HOME,
	SIGN_IN,
	DATA_TABLE_DETAILS,
	GCS_TO_GCS_RUNS_LISTING,
	GCS_TO_GCS_RUNS_ITEM,
	GCS_TO_GCS_CONFIGURATIONS_LISTING,
	GCS_TO_GCS_CONFIGURATIONS_ITEM,
	STORAGE_TO_STORAGE_RUNS_LISTING,
	STORAGE_TO_STORAGE_RUNS_ITEM,
	STORAGE_TO_STORAGE_CONFIGURATIONS_LISTING,
	STORAGE_TO_STORAGE_CONFIGURATIONS_ITEM,
	STORAGE_TO_TABLE_RUNS_LISTING,
	STORAGE_TO_TABLE_RUNS_ITEM,
	STORAGE_TO_TABLE_CONFIGURATIONS_LISTING,
	STORAGE_TO_TABLE_CONFIGURATIONS_ITEM,
	STORAGE_TO_TABLES_RUNS_LISTING,
	STORAGE_TO_TABLES_RUNS_ITEM,
	STORAGE_TO_TABLES_CONFIGURATIONS_LISTING,
	STORAGE_TO_TABLES_CONFIGURATIONS_ITEM,
	TABLES_TO_TABLES_RUNS_LISTING,
	TABLES_TO_TABLES_RUNS_ITEM,
	TABLES_TO_TABLES_CONFIGURATIONS_LISTING,
	TABLES_TO_TABLES_CONFIGURATIONS_ITEM,
	GBQ_TO_GCS_RUNS_LISTING,
	GBQ_TO_GCS_RUNS_ITEM,
	GBQ_TO_GCS_CONFIGURATIONS_LISTING,
	GBQ_TO_GCS_CONFIGURATIONS_ITEM,
	TABLE_TO_STORAGE_RUNS_LISTING,
	TABLE_TO_STORAGE_RUNS_ITEM,
	TABLE_TO_STORAGE_CONFIGURATIONS_LISTING,
	TABLE_TO_STORAGE_CONFIGURATIONS_ITEM,
	VM_LAUNCHER_RUNS_LISTING,
	VM_LAUNCHER_RUNS_ITEM,
	VM_LAUNCHER_CONFIGURATIONS_LISTING,
	VM_LAUNCHER_CONFIGURATIONS_ITEM,
	WORKFLOW_STATUS_LISTING,
	WORKFLOW_STATUS_ITEM,
	WORKFLOW_CONFIGURATIONS_LISTING,
	WORKFLOW_CONFIGURATIONS_ITEM,
	PROFILE,
	USERS,
	ACCOUNTS,
	CLOUD_FUNCTIONS
};
