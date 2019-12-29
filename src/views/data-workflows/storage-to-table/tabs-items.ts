import {
	STORAGE_TO_TABLE_RUNS_LISTING,
	STORAGE_TO_TABLE_CONFIGURATIONS_LISTING
} from '@/constants/router/routes-names';

export default {
	computed: {
		tabsItems() {
			return [
				{ id: 1, title: 'Runs', link: { name: STORAGE_TO_TABLE_RUNS_LISTING } },
				{ id: 2, title: 'Configurations', link: { name: STORAGE_TO_TABLE_CONFIGURATIONS_LISTING } },
				{ id: 3, title: 'Documentation', link: '' }
			];
		}
	}
};
