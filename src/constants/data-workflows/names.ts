type Name = {
	url: string;
	displayName: string;
};

export const GCS_TO_GCS: Name = { url: 'gcs-to-gcs', displayName: 'GCS to GCS' };
export const STORAGE_TO_STORAGE: Name = { url: 'storage-to-storage', displayName: 'Storage to Storage' };
export const STORAGE_TO_TABLE: Name = { url: 'storage-to-table', displayName: 'Storage to Table' };
export const STORAGE_TO_TABLES: Name = { url: 'storage-to-tables', displayName: 'Storage to Tables' };
export const TABLES_TO_TABLES: Name = { url: 'tables-to-tables', displayName: 'Tables to Tables' };
export const GBQ_TO_GCS: Name = { url: 'gbq-to-gcs', displayName: 'GBQ to GCS' };
export const TABLE_TO_STORAGE: Name = { url: 'table-to-storage', displayName: 'Table to Storage' };
export const VM_LAUNCHER: Name = { url: 'vm-launcher', displayName: 'VM Launcher' };
export const WORKFLOW: Name = { url: 'workflow', displayName: 'Workflow' };

export default {
	GCS_TO_GCS,
	STORAGE_TO_STORAGE,
	STORAGE_TO_TABLE,
	STORAGE_TO_TABLES,
	TABLES_TO_TABLES,
	GBQ_TO_GCS,
	TABLE_TO_STORAGE,
	VM_LAUNCHER,
	WORKFLOW,
};
