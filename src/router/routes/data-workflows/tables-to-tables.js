import { DATA_WORKFLOWS } from '@/constants/router/paths-prefixes';
import { TABLES_TO_TABLES } from '@/constants/data-workflows/names';
import { RUNS, CONFIGURATIONS } from '@/constants/data-workflows/status';
import {
	TABLES_TO_TABLES_RUNS_LISTING,
	TABLES_TO_TABLES_RUNS_ITEM,
	TABLES_TO_TABLES_CONFIGURATIONS_LISTING,
	TABLES_TO_TABLES_CONFIGURATIONS_ITEM
} from '@/constants/router/routes-names';

export default [
	/**
	 * RUNS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${TABLES_TO_TABLES}/${RUNS}`,
		name: TABLES_TO_TABLES_RUNS_LISTING,
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/tables-to-tables/runs/listing" */ '@/views/data-workflows/tables-to-tables/TablesToTablesRuns.vue'
			)
	},
	{
		// TODO: Rename param to :id
		path: `/${DATA_WORKFLOWS}/${TABLES_TO_TABLES}/${RUNS}/:pathId`,
		name: TABLES_TO_TABLES_RUNS_ITEM,
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/tables-to-tables/runs/item" */ '@/views/data-workflows/tables-to-tables/TablesToTablesRun.vue'
			)
	},

	/**
	 * CONFIGURATIONS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${TABLES_TO_TABLES}/${CONFIGURATIONS}`,
		name: TABLES_TO_TABLES_CONFIGURATIONS_LISTING,
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/tables-to-tables/configurations/listing" */ '@/views/data-workflows/tables-to-tables/TablesToTablesConfs.vue'
			)
	},
	{
		// TODO: Rename param to :id
		path: `/${DATA_WORKFLOWS}/${TABLES_TO_TABLES}/${CONFIGURATIONS}/:confId`,
		name: TABLES_TO_TABLES_CONFIGURATIONS_ITEM,
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/tables-to-tables/configurations/item" */ '@/views/data-workflows/tables-to-tables/TablesToTablesConf.vue'
			)
	}
];