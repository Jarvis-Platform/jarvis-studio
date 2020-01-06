import { STORAGE_TO_STORAGE } from '@/constants/data-workflows/names';
import {
	STORAGE_TO_STORAGE_RUNS_LISTING,
	STORAGE_TO_STORAGE_CONFIGURATIONS_LISTING
} from '@/constants/router/routes-names';

export default {
	computed: {
		workflowName() {
			return STORAGE_TO_STORAGE.displayName;
		},
		tabsItems() {
			return [
				{ id: 1, title: 'Runs', link: { name: STORAGE_TO_STORAGE_RUNS_LISTING } },
				{ id: 2, title: 'Configurations', link: { name: STORAGE_TO_STORAGE_CONFIGURATIONS_LISTING } },
				{ id: 3, title: 'Documentation', link: '' }
			];
		}
	}
};
