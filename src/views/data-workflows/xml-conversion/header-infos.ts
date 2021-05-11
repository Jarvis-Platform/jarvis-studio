import { Component, Vue } from 'vue-property-decorator';
import { XML_CONVERSION } from '@/constants/data-workflows/names';
import { XML_CONVERSION_CONFIGURATIONS_LISTING } from '@/constants/router/routes-names';

@Component
export default class HeaderInfos extends Vue {
	get workflowName() {
		return XML_CONVERSION.displayName;
	}

	get tabsItems() {
		return [
			{ id: 2, title: 'Configurations', link: { name: XML_CONVERSION_CONFIGURATIONS_LISTING } },
			{ id: 3, title: 'Documentation', link: '' },
		];
	}
}
