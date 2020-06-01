import { RouteConfig } from 'vue-router';

import { auth, hasAccount, superAdmin } from '@/router/middleware';
import { DATA_WORKFLOWS } from '@/constants/router/paths-prefixes';
import { STORAGE_TO_TABLE } from '@/constants/data-workflows/names';
import { RUNS, CONFIGURATIONS } from '@/constants/data-workflows/status';
import {
	STORAGE_TO_TABLE_RUNS_LISTING,
	STORAGE_TO_TABLE_RUNS_ITEM,
	STORAGE_TO_TABLE_CONFIGURATIONS_LISTING,
	STORAGE_TO_TABLE_CONFIGURATIONS_ITEM,
} from '@/constants/router/routes-names';

export const storageToTableRoutes: RouteConfig[] = [
	/**
	 * RUNS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${STORAGE_TO_TABLE.url}/${RUNS}`,
		name: STORAGE_TO_TABLE_RUNS_LISTING,
		meta: { middleware: [auth, superAdmin, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/storage-to-table/runs/listing" */ '@/views/data-workflows/storage-to-table/runs/ListingView.vue'
			),
	},
	{
		path: `/${DATA_WORKFLOWS}/${STORAGE_TO_TABLE.url}/${RUNS}/:id`,
		name: STORAGE_TO_TABLE_RUNS_ITEM,
		meta: { middleware: [auth, superAdmin, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/storage-to-table/runs/item" */ '@/views/data-workflows/storage-to-table/runs/ItemView.vue'
			),
	},

	/**
	 * CONFIGURATIONS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${STORAGE_TO_TABLE.url}/${CONFIGURATIONS}`,
		name: STORAGE_TO_TABLE_CONFIGURATIONS_LISTING,
		meta: { middleware: [auth, superAdmin, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/storage-to-table/configurations/listing" */ '@/views/data-workflows/storage-to-table/configurations/ListingView.vue'
			),
	},
	{
		path: `/${DATA_WORKFLOWS}/${STORAGE_TO_TABLE.url}/${CONFIGURATIONS}/:bucketId/:id`,
		name: STORAGE_TO_TABLE_CONFIGURATIONS_ITEM,
		meta: { middleware: [auth, superAdmin, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/storage-to-table/configurations/item" */ '@/views/data-workflows/storage-to-table/configurations/ItemView.vue'
			),
	},
];
