import { RouteConfig } from 'vue-router';

import { auth, hasAccount } from '@/router/middleware';
import { DATA_MODELS } from '@/constants/router/paths-prefixes';
import { DATA_TABLE_DETAILS, TABLES_LISTING } from '@/constants/router/routes-names';

export const dataModelsRoutes: RouteConfig[] = [
	{
		path: `/${DATA_MODELS}/:projectId/:datasetId`,
		name: TABLES_LISTING,
		meta: { middleware: [auth, hasAccount] },
		component: () =>
			import(/* webpackChunkName: "data-models/data-table-details" */ '@/views/data-models/TablesListing.vue'),
	},
	{
		path: `/${DATA_MODELS}/:projectId/:datasetId/:tableId`,
		name: DATA_TABLE_DETAILS,
		meta: { middleware: [auth, hasAccount] },
		component: () =>
			import(/* webpackChunkName: "data-models/data-table-details" */ '@/views/data-models/TableDetails.vue'),
	},
];
