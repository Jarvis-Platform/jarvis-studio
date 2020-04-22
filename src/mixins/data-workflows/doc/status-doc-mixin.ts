import { Component } from 'vue-property-decorator';
import { DataWorkflowsType, StatusProps } from '@/types';
import DocMixin from '@/mixins/data-workflows/doc/doc-mixin';
import { STATUS } from '@/constants/data-workflows/status';

@Component
export default class StatusDocMixin extends DocMixin {
	get type(): DataWorkflowsType {
		return STATUS;
	}

	get statusProps(): StatusProps {
		return {
			type: this.type!,
			tabsItems: this.itemTabsItems,
			isLoading: this.isLoading,
			isNotFound: this.isNotFound,
		};
	}
}
