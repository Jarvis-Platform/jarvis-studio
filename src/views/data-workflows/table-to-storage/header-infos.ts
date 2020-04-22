import { Component, Vue } from 'vue-property-decorator';
import { TABLE_TO_STORAGE } from '@/constants/data-workflows/names';
import {
	TABLE_TO_STORAGE_RUNS_LISTING,
	TABLE_TO_STORAGE_CONFIGURATIONS_LISTING,
} from '@/constants/router/routes-names';

@Component
export default class HeaderInfos extends Vue {
	get workflowName() {
		return TABLE_TO_STORAGE.displayName;
	}

	get tabsItems() {
		return [
			{ id: 1, title: 'Runs', link: { name: TABLE_TO_STORAGE_RUNS_LISTING } },
			{ id: 2, title: 'Configurations', link: { name: TABLE_TO_STORAGE_CONFIGURATIONS_LISTING } },
			{ id: 3, title: 'Documentation', link: '' },
		];
	}
}
