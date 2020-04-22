import { RouteConfig } from 'vue-router';

import { auth, hasAccount } from '@/router/middleware';
import { DATA_WORKFLOWS } from '@/constants/router/paths-prefixes';
import { STORAGE_TO_TABLES } from '@/constants/data-workflows/names';
import { RUNS, CONFIGURATIONS } from '@/constants/data-workflows/status';
import {
	STORAGE_TO_TABLES_RUNS_LISTING,
	STORAGE_TO_TABLES_RUNS_ITEM,
	STORAGE_TO_TABLES_CONFIGURATIONS_LISTING,
	STORAGE_TO_TABLES_CONFIGURATIONS_ITEM,
} from '@/constants/router/routes-names';

export const storageToTablesRoutes: RouteConfig[] = [
	/**
	 * RUNS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${STORAGE_TO_TABLES.url}/${RUNS}`,
		name: STORAGE_TO_TABLES_RUNS_LISTING,
		meta: { middleware: [auth, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/storage-to-table/runs/listing" */ '@/views/data-workflows/storage-to-tables/runs/ListingView.vue'
			),
	},
	{
		path: `/${DATA_WORKFLOWS}/${STORAGE_TO_TABLES.url}/${RUNS}/:id`,
		name: STORAGE_TO_TABLES_RUNS_ITEM,
		meta: { middleware: [auth, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/storage-to-table/runs/item" */ '@/views/data-workflows/storage-to-tables/runs/ItemView.vue'
			),
	},

	/**
	 * CONFIGURATIONS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${STORAGE_TO_TABLES.url}/${CONFIGURATIONS}`,
		name: STORAGE_TO_TABLES_CONFIGURATIONS_LISTING,
		meta: { middleware: [auth, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/storage-to-table/configurations/listing" */ '@/views/data-workflows/storage-to-tables/configurations/ListingView.vue'
			),
	},
	{
		path: `/${DATA_WORKFLOWS}/${STORAGE_TO_TABLES.url}/${CONFIGURATIONS}/:id`,
		name: STORAGE_TO_TABLES_CONFIGURATIONS_ITEM,
		meta: { middleware: [auth, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/storage-to-table/configurations/item" */ '@/views/data-workflows/storage-to-tables/configurations/ItemView.vue'
			),
	},
];
