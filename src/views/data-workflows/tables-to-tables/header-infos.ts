import { Component, Vue } from 'vue-property-decorator';
import { TABLES_TO_TABLES } from '@/constants/data-workflows/names';
import {
	TABLES_TO_TABLES_RUNS_LISTING,
	TABLES_TO_TABLES_CONFIGURATIONS_LISTING,
} from '@/constants/router/routes-names';

@Component
export default class HeaderInfos extends Vue {
	get workflowName() {
		return TABLES_TO_TABLES.displayName;
	}

	get tabsItems() {
		return [
			{ id: 1, title: 'Runs', link: { name: TABLES_TO_TABLES_RUNS_LISTING } },
			{ id: 2, title: 'Configurations', link: { name: TABLES_TO_TABLES_CONFIGURATIONS_LISTING } },
			{ id: 3, title: 'Documentation', link: '' },
		];
	}
}
