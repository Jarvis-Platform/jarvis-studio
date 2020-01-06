import {
	TABLES_TO_TABLES_RUNS_LISTING,
	TABLES_TO_TABLES_CONFIGURATIONS_LISTING
} from '@/constants/router/routes-names';

export default {
	computed: {
		tabsItems() {
			return [
				{ id: 1, title: 'Runs', link: { name: TABLES_TO_TABLES_RUNS_LISTING } },
				{ id: 2, title: 'Configurations', link: { name: TABLES_TO_TABLES_CONFIGURATIONS_LISTING } },
				{ id: 3, title: 'Documentation', link: '' }
			];
		}
	}
};
