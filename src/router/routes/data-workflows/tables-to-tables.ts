import { RouteConfig } from 'vue-router';

import { auth, hasAccount } from '@/router/middleware';
import { DATA_WORKFLOWS } from '@/constants/router/paths-prefixes';
import { TABLES_TO_TABLES } from '@/constants/data-workflows/names';
import { RUNS, CONFIGURATIONS } from '@/constants/data-workflows/status';
import {
	TABLES_TO_TABLES_RUNS_LISTING,
	TABLES_TO_TABLES_RUNS_ITEM,
	TABLES_TO_TABLES_CONFIGURATIONS_LISTING,
	TABLES_TO_TABLES_CONFIGURATIONS_ITEM,
} from '@/constants/router/routes-names';

export const tablesToTablesRoutes: RouteConfig[] = [
	/**
	 * RUNS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${TABLES_TO_TABLES.url}/${RUNS}`,
		name: TABLES_TO_TABLES_RUNS_LISTING,
		meta: { middleware: [auth, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/tables-to-tables/runs/listing" */ '@/views/data-workflows/tables-to-tables/runs/ListingView.vue'
			),
	},
	{
		path: `/${DATA_WORKFLOWS}/${TABLES_TO_TABLES.url}/${RUNS}/:id`,
		name: TABLES_TO_TABLES_RUNS_ITEM,
		meta: { middleware: [auth, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/tables-to-tables/runs/item" */ '@/views/data-workflows/tables-to-tables/runs/ItemView.vue'
			),
	},

	/**
	 * CONFIGURATIONS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${TABLES_TO_TABLES.url}/${CONFIGURATIONS}`,
		name: TABLES_TO_TABLES_CONFIGURATIONS_LISTING,
		meta: { middleware: [auth, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/tables-to-tables/configurations/listing" */ '@/views/data-workflows/tables-to-tables/configurations/ListingView.vue'
			),
	},
	{
		path: `/${DATA_WORKFLOWS}/${TABLES_TO_TABLES.url}/${CONFIGURATIONS}/:id`,
		name: TABLES_TO_TABLES_CONFIGURATIONS_ITEM,
		meta: { middleware: [auth, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/tables-to-tables/configurations/item" */ '@/views/data-workflows/tables-to-tables/configurations/ItemView.vue'
			),
	},
];
