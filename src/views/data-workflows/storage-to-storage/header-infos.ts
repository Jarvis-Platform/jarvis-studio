import { Component, Vue } from 'vue-property-decorator';
import { STORAGE_TO_STORAGE } from '@/constants/data-workflows/names';
import {
	STORAGE_TO_STORAGE_RUNS_LISTING,
	STORAGE_TO_STORAGE_CONFIGURATIONS_LISTING,
} from '@/constants/router/routes-names';

@Component
export default class HeaderInfos extends Vue {
	get workflowName() {
		return STORAGE_TO_STORAGE.displayName;
	}

	get tabsItems() {
		return [
			{ id: 1, title: 'Runs', link: { name: STORAGE_TO_STORAGE_RUNS_LISTING } },
			{ id: 2, title: 'Configurations', link: { name: STORAGE_TO_STORAGE_CONFIGURATIONS_LISTING } },
			{ id: 3, title: 'Documentation', link: '' },
		];
	}
}
