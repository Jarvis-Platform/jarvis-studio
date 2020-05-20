import { RouteConfig } from 'vue-router';

import { auth, hasAccount, superAdmin } from '@/router/middleware';
import { DATA_WORKFLOWS } from '@/constants/router/paths-prefixes';
import { GCS_TO_GCS } from '@/constants/data-workflows/names';
import { RUNS, CONFIGURATIONS } from '@/constants/data-workflows/status';
import {
	GCS_TO_GCS_RUNS_LISTING,
	GCS_TO_GCS_RUNS_ITEM,
	GCS_TO_GCS_CONFIGURATIONS_LISTING,
	GCS_TO_GCS_CONFIGURATIONS_ITEM,
} from '@/constants/router/routes-names';

export const gcsToGcsRoutes: RouteConfig[] = [
	/**
	 * RUNS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${GCS_TO_GCS.url}/${RUNS}`,
		name: GCS_TO_GCS_RUNS_LISTING,
		meta: { middleware: [auth, superAdmin, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/gcs-to-gcs/runs/listing" */ '@/views/data-workflows/gcs-to-gcs/runs/ListingView.vue'
			),
	},
	{
		path: `/${DATA_WORKFLOWS}/${GCS_TO_GCS.url}/${RUNS}/:id`,
		name: GCS_TO_GCS_RUNS_ITEM,
		meta: { middleware: [auth, superAdmin, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/gcs-to-gcs/runs/item" */ '@/views/data-workflows/gcs-to-gcs/runs/ItemView.vue'
			),
	},

	/**
	 * CONFIGURATIONS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${GCS_TO_GCS.url}/${CONFIGURATIONS}`,
		name: GCS_TO_GCS_CONFIGURATIONS_LISTING,
		meta: { middleware: [auth, superAdmin, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/gcs-to-gcs/configurations/listing" */ '@/views/data-workflows/gcs-to-gcs/configurations/ListingView.vue'
			),
	},
	{
		path: `/${DATA_WORKFLOWS}/${GCS_TO_GCS.url}/${CONFIGURATIONS}/:id`,
		name: GCS_TO_GCS_CONFIGURATIONS_ITEM,
		meta: { middleware: [auth, superAdmin, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/gcs-to-gcs/configurations/item" */ '@/views/data-workflows/gcs-to-gcs/configurations/ItemView.vue'
			),
	},
];
