import { GBQ_TO_GCS } from '@/constants/data-workflows/names';
import { GBQ_TO_GCS_RUNS_LISTING, GBQ_TO_GCS_CONFIGURATIONS_LISTING } from '@/constants/router/routes-names';

export default {
	computed: {
		workflowName() {
			return GBQ_TO_GCS.displayName;
		},
		tabsItems() {
			return [
				{ id: 1, title: 'Runs', link: { name: GBQ_TO_GCS_RUNS_LISTING } },
				{ id: 2, title: 'Configurations', link: { name: GBQ_TO_GCS_CONFIGURATIONS_LISTING } },
				{ id: 3, title: 'Documentation', link: '' }
			];
		}
	}
};