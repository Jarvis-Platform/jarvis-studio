import { RouteConfig } from 'vue-router';

import { appRoutes } from './routes/app';
import { authRoutes } from './routes/auth';
import { dataModelsRoutes } from './routes/data-models';
import { storageToStorageRoutes } from './routes/data-workflows/storage-to-storage';
import { storageToTablesRoutes } from './routes/data-workflows/storage-to-tables';
import { tablesToTablesRoutes } from './routes/data-workflows/tables-to-tables';
import { tableToStorageRoutes } from './routes/data-workflows/table-to-storage';
import { vmLauncherRoutes } from './routes/data-workflows/vm-launcher';
import { workflowRoutes } from './routes/data-workflows/workflow';
import { contextRoutes } from './routes/data-workflows/context';
import { settingsRoutes } from './routes/settings';

export const routes: RouteConfig[] = [
	...appRoutes,
	...authRoutes,
	...dataModelsRoutes,
	// TODO: Use nested routes for data-workflows
	...storageToStorageRoutes,
	...storageToTablesRoutes,
	...tablesToTablesRoutes,
	...tableToStorageRoutes,
	...vmLauncherRoutes,
	...workflowRoutes,
	...contextRoutes,
	// END
	...settingsRoutes,
];
