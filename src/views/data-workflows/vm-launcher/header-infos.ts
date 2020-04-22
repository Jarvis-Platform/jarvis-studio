import { Component, Vue } from 'vue-property-decorator';
import { VM_LAUNCHER } from '@/constants/data-workflows/names';
import { VM_LAUNCHER_RUNS_LISTING, VM_LAUNCHER_CONFIGURATIONS_LISTING } from '@/constants/router/routes-names';

@Component
export default class HeaderInfos extends Vue {
	get workflowName() {
		return VM_LAUNCHER.displayName;
	}

	get tabsItems() {
		return [
			{ id: 1, title: 'Runs', link: { name: VM_LAUNCHER_RUNS_LISTING } },
			{ id: 2, title: 'Configurations', link: { name: VM_LAUNCHER_CONFIGURATIONS_LISTING } },
			{ id: 3, title: 'Documentation', link: '' },
		];
	}
}
