import { RouteConfig } from 'vue-router';

import { auth, hasAccount } from '@/router/middleware';
import { DATA_WORKFLOWS } from '@/constants/router/paths-prefixes';
import { WORKFLOW } from '@/constants/data-workflows/names';
import { STATUS, CONFIGURATIONS } from '@/constants/data-workflows/status';
import {
	WORKFLOW_STATUS_LISTING,
	WORKFLOW_STATUS_ITEM,
	WORKFLOW_CONFIGURATIONS_LISTING,
	WORKFLOW_CONFIGURATIONS_ITEM,
} from '@/constants/router/routes-names';

export const workflowRoutes: RouteConfig[] = [
	/**
	 * STATUS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${WORKFLOW.url}/${STATUS}`,
		name: WORKFLOW_STATUS_LISTING,
		meta: { middleware: [auth, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/workflow/status/listing" */ '@/views/data-workflows/workflow/status/ListingView.vue'
			),
	},
	{
		path: `/${DATA_WORKFLOWS}/${WORKFLOW.url}/${STATUS}/:id`,
		name: WORKFLOW_STATUS_ITEM,
		meta: { middleware: [auth, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/workflow/status/listing" */ '@/views/data-workflows/workflow/status/ItemView.vue'
			),
	},

	/**
	 * CONFIGURATIONS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${WORKFLOW.url}/${CONFIGURATIONS}`,
		name: WORKFLOW_CONFIGURATIONS_LISTING,
		meta: { middleware: [auth, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/workflow/configurations/listing" */ '@/views/data-workflows/workflow/configurations/ListingView.vue'
			),
	},
	{
		path: `/${DATA_WORKFLOWS}/${WORKFLOW.url}/${CONFIGURATIONS}/:id`,
		name: WORKFLOW_CONFIGURATIONS_ITEM,
		meta: { middleware: [auth, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/workflow/configurations/listing" */ '@/views/data-workflows/workflow/configurations/ItemView.vue'
			),
	},
];
