import {
	STORAGE_TO_TABLES_RUNS_LISTING,
	STORAGE_TO_TABLES_RUNS_ITEM,
	STORAGE_TO_TABLES_CONFIGURATIONS_LISTING,
	STORAGE_TO_TABLES_CONFIGURATIONS_ITEM
} from '@/constants/router/routes-names';

// TODO: Update all keys

export const getWorkflowName = name => {
	const items = {
		// GCS to GCS
		GcsToGcsRuns: 'GCS to GCS',
		GcsToGcsRun: 'GCS to GCS',
		GcsToGcsConfs: 'GCS to GCS',
		GcsToGcsConf: 'GCS to GCS',

		// Storage to Storage
		StorageToStorageRuns: 'Storage to Storage',
		StorageToStorageRun: 'Storage to Storage',
		StorageToStorageConfs: 'Storage to Storage',
		StorageToStorageConf: 'Storage to Storage',

		// GCS to GBQ
		// TODO: Update names
		GcsToGbqRuns: 'Storage to Table',
		StorageToTableRun: 'Storage to Table',
		GcsToGbqConfs: 'Storage to Table',
		StorageToTableConf: 'Storage to Table',

		// Storage to tables
		[STORAGE_TO_TABLES_RUNS_LISTING]: 'Storage to Tables',
		[STORAGE_TO_TABLES_RUNS_ITEM]: 'Storage to Table',
		[STORAGE_TO_TABLES_CONFIGURATIONS_LISTING]: 'Storage to Table',
		[STORAGE_TO_TABLES_CONFIGURATIONS_ITEM]: 'Storage to Table',

		// Tables to Tables
		TablesToTablesRuns: 'Tables to Tables',
		TablesToTablesRun: 'Tables to Tables',
		TablesToTablesConfs: 'Tables to Tables',
		TablesToTablesConf: 'Tables to Tables',

		// GBQ to GCS
		gbqToGcsRuns: 'GBQ to GCS',
		gbqToGcsRun: 'GBQ to GCS',
		gbqToGcsConfs: 'GBQ to GCS',
		GbqToGcsConf: 'GBQ to GCS',

		// Table to Storage
		TableToStorageRuns: 'Table to Storage',
		TableToStorageRun: 'Table to Storage',
		TableToStorageConfs: 'Table to Storage',
		TableToStorageConf: 'Table to Storage',

		// VM Launcher
		// TODO: Update names
		vmLauncherRuns: 'VM Launcher',
		vmLauncherConfs: 'VM Launcher',

		// Workflow
		WorkflowStatus: 'Workflow',
		WorkflowConfs: 'Workflow'
	};

	return items[name];
};

export default {
	getWorkflowName
};
