import { DATA_WORKFLOWS } from '@/constants/router/paths-prefixes';
import { WORKFLOW } from '@/constants/data-workflows/names';
import { STATUS, CONFIGURATIONS } from '@/constants/data-workflows/status';

export default [
	/**
	 * STATUS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${WORKFLOW}/${STATUS}`,
		name: 'WorkflowStatus',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/workflow/status/listing" */ '@/views/data-workflows/workflow/WorkflowStatus.vue'
			)
	},
	// TODO: Create status view

	/**
	 * CONFIGURATIONS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${WORKFLOW}/${CONFIGURATIONS}`,
		name: 'WorkflowConfs',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/workflow/configurations/listing" */ '@/views/data-workflows/workflow/WorkflowConfs.vue'
			)
	}
	// TODO: Create configuration view
];
