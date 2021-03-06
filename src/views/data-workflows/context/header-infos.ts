import { Component, Vue } from 'vue-property-decorator';
import { CONTEXT } from '@/constants/data-workflows/names';
import { CONTEXT_CONFIGURATIONS_LISTING } from '@/constants/router/routes-names';

@Component
export default class HeaderInfos extends Vue {
	get workflowName() {
		return CONTEXT.displayName;
	}

	get tabsItems() {
		return [
			{ id: 2, title: 'Configurations', link: { name: CONTEXT_CONFIGURATIONS_LISTING } },
			{ id: 3, title: 'Documentation', link: '' },
		];
	}
}
