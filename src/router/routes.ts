import { RouteConfig } from 'vue-router';

import { appRoutes } from './routes/app';
import { authRoutes } from './routes/auth';
import { dataModelsRoutes } from './routes/data-models';
import { gcsToGcsRoutes } from './routes/data-workflows/gcs-to-gcs';
import { storageToStorageRoutes } from './routes/data-workflows/storage-to-storage';
import { storageToTableRoutes } from './routes/data-workflows/storage-to-table';
import { storageToTablesRoutes } from './routes/data-workflows/storage-to-tables';
import { tablesToTablesRoutes } from './routes/data-workflows/tables-to-tables';
import { gbqToGcsRoutes } from './routes/data-workflows/gbq-to-gcs';
import { tableToStorageRoutes } from './routes/data-workflows/table-to-storage';
import { vmLauncherRoutes } from './routes/data-workflows/vm-launcher';
import { workflowRoutes } from './routes/data-workflows/workflow';
import { settingsRoutes } from './routes/settings';

export const routes: RouteConfig[] = [
	...appRoutes,
	...authRoutes,
	...dataModelsRoutes,
	// TODO: Use nested routes for data-workflows
	...gcsToGcsRoutes,
	...storageToStorageRoutes,
	...storageToTableRoutes,
	...storageToTablesRoutes,
	...tablesToTablesRoutes,
	...gbqToGcsRoutes,
	...tableToStorageRoutes,
	...vmLauncherRoutes,
	...workflowRoutes,
	// END
	...settingsRoutes,
];
