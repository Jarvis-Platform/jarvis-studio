import { RouteConfig } from 'vue-router';

import { auth, hasAccount } from '@/router/middleware';
import { DATA_WORKFLOWS } from '@/constants/router/paths-prefixes';
import { VM_LAUNCHER } from '@/constants/data-workflows/names';
import { RUNS, CONFIGURATIONS } from '@/constants/data-workflows/status';
import {
	VM_LAUNCHER_RUNS_LISTING,
	VM_LAUNCHER_RUNS_ITEM,
	VM_LAUNCHER_CONFIGURATIONS_LISTING,
	VM_LAUNCHER_CONFIGURATIONS_ITEM,
} from '@/constants/router/routes-names';

export const vmLauncherRoutes: RouteConfig[] = [
	/**
	 * RUNS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${VM_LAUNCHER.url}/${RUNS}`,
		name: VM_LAUNCHER_RUNS_LISTING,
		meta: { middleware: [auth, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/vm-launcher/runs/listing" */ '@/views/data-workflows/vm-launcher/runs/ListingView.vue'
			),
	},
	{
		path: `/${DATA_WORKFLOWS}/${VM_LAUNCHER.url}/${RUNS}/:id`,
		name: VM_LAUNCHER_RUNS_ITEM,
		meta: { middleware: [auth, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/vm-launcher/runs/listing" */ '@/views/data-workflows/vm-launcher/runs/ItemView.vue'
			),
	},

	/**
	 * CONFIGURATIONS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${VM_LAUNCHER.url}/${CONFIGURATIONS}`,
		name: VM_LAUNCHER_CONFIGURATIONS_LISTING,
		meta: { middleware: [auth, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/vm-launcher/configurations/listing" */ '@/views/data-workflows/vm-launcher/configurations/ListingView.vue'
			),
	},
	{
		path: `/${DATA_WORKFLOWS}/${VM_LAUNCHER.url}/${CONFIGURATIONS}/:id`,
		name: VM_LAUNCHER_CONFIGURATIONS_ITEM,
		meta: { middleware: [auth, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/vm-launcher/configurations/listing" */ '@/views/data-workflows/vm-launcher/configurations/ItemView.vue'
			),
	},
];
