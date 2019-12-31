import { auth, hasAccount } from '@/router/middleware';

import { DATA_WORKFLOWS } from '@/constants/router/paths-prefixes';
import { GBQ_TO_GCS } from '@/constants/data-workflows/names';
import { RUNS, CONFIGURATIONS } from '@/constants/data-workflows/status';
import {
	GBQ_TO_GCS_RUNS_LISTING,
	GBQ_TO_GCS_RUNS_ITEM,
	GBQ_TO_GCS_CONFIGURATIONS_LISTING,
	GBQ_TO_GCS_CONFIGURATIONS_ITEM
} from '@/constants/router/routes-names';

export default [
	/**
	 * RUNS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${GBQ_TO_GCS}/${RUNS}`,
		name: GBQ_TO_GCS_RUNS_LISTING,
		meta: { middleware: [auth, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/gbq-to-gcs/runs/listing" */ '@/views/data-workflows/gbq-to-gcs/runs/ListingView.vue'
			)
	},
	{
		path: `/${DATA_WORKFLOWS}/${GBQ_TO_GCS}/${RUNS}/:id`,
		name: GBQ_TO_GCS_RUNS_ITEM,
		meta: { middleware: [auth, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/gbq-to-gcs/runs/listing" */ '@/views/data-workflows/gbq-to-gcs/runs/ItemView.vue'
			)
	},

	/**
	 * CONFIGURATIONS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${GBQ_TO_GCS}/${CONFIGURATIONS}`,
		name: GBQ_TO_GCS_CONFIGURATIONS_LISTING,
		meta: { middleware: [auth, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/gbq-to-gcs/configurations/listing" */ '@/views/data-workflows/gbq-to-gcs/configurations/ListingView.vue'
			)
	},
	{
		path: `/${DATA_WORKFLOWS}/${GBQ_TO_GCS}/${CONFIGURATIONS}/:id`,
		name: GBQ_TO_GCS_CONFIGURATIONS_ITEM,
		meta: { middleware: [auth, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/gbq-to-gcs/configurations/item" */ '@/views/data-workflows/gbq-to-gcs/configurations/ItemView.vue'
			)
	}
];
