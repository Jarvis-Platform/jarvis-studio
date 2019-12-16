import { auth } from '@/router/middleware';

import { DATA_WORKFLOWS } from '@/constants/router/paths-prefixes';
import { GCS_TO_GCS } from '@/constants/data-workflows/names';
import { RUNS, CONFIGURATIONS } from '@/constants/data-workflows/status';
import {
	GCS_TO_GCS_RUNS_LISTING,
	GCS_TO_GCS_RUNS_ITEM,
	GCS_TO_GCS_CONFIGURATIONS_LISTING,
	GCS_TO_GCS_CONFIGURATIONS_ITEM
} from '@/constants/router/routes-names';

export default [
	/**
	 * RUNS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${GCS_TO_GCS}/${RUNS}`,
		name: GCS_TO_GCS_RUNS_LISTING,
		meta: { middleware: [auth] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/gcs-to-gcs/runs/listing" */ '@/views/data-workflows/gcs-to-gcs/GcsToGcsRuns.vue'
			)
	},
	{
		// TODO: Rename param to :id
		path: `/${DATA_WORKFLOWS}/${GCS_TO_GCS}/${RUNS}/:runId`,
		name: GCS_TO_GCS_RUNS_ITEM,
		meta: { middleware: [auth] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/gcs-to-gcs/runs/item" */ '@/views/data-workflows/gcs-to-gcs/GcsToGcsRun.vue'
			)
	},

	/**
	 * CONFIGURATIONS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${GCS_TO_GCS}/${CONFIGURATIONS}`,
		name: GCS_TO_GCS_CONFIGURATIONS_LISTING,
		meta: { middleware: [auth] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/gcs-to-gcs/configurations/listing" */ '@/views/data-workflows/gcs-to-gcs/GcsToGcsConfs.vue'
			)
	},
	{
		// TODO: Rename param to :id
		path: `/${DATA_WORKFLOWS}/${GCS_TO_GCS}/${CONFIGURATIONS}/:confId`,
		name: GCS_TO_GCS_CONFIGURATIONS_ITEM,
		meta: { middleware: [auth] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/gcs-to-gcs/configurations/item" */ '@/views/data-workflows/gcs-to-gcs/GcsToGcsConf.vue'
			)
	}
];
