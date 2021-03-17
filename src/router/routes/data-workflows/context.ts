import { RouteConfig } from 'vue-router';

import { auth, hasAccount, remoteConfig } from '@/router/middleware';
import { DATA_WORKFLOWS } from '@/constants/router/paths-prefixes';
import { CONTEXT } from '@/constants/data-workflows/names';
import { CONFIGURATIONS } from '@/constants/data-workflows/status';
import { CONTEXT_CONFIGURATIONS_LISTING, CONTEXT_CONFIGURATIONS_ITEM } from '@/constants/router/routes-names';

export const contextRoutes: RouteConfig[] = [
	/**
	 * CONFIGURATIONS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${CONTEXT.url}/${CONFIGURATIONS}`,
		name: CONTEXT_CONFIGURATIONS_LISTING,
		meta: { middleware: [auth, hasAccount, remoteConfig.canAccessContexts] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/context/configurations/listing" */ '@/views/data-workflows/context/configurations/ListingView.vue'
			),
	},
	{
		path: `/${DATA_WORKFLOWS}/${CONTEXT.url}/${CONFIGURATIONS}/:id`,
		name: CONTEXT_CONFIGURATIONS_ITEM,
		meta: { middleware: [auth, hasAccount, remoteConfig.canAccessContexts] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/context/configurations/item" */ '@/views/data-workflows/context/configurations/ItemView.vue'
			),
	},
];
