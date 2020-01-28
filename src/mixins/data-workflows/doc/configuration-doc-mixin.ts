import { Component } from 'vue-property-decorator';
import { ConfigurationProps, DataWorkflowsType } from '@/types';
import ItemMixin from '@/mixins/data-workflows/doc/item-mixin';
import { CONFIGURATIONS } from '@/constants/data-workflows/status';

@Component
export default class ConfigurationDocMixin extends ItemMixin {
	get type(): DataWorkflowsType {
		return CONFIGURATIONS;
	}

	get updateInformation() {
		// TODO: Add UserSocialInfo
		return {
			update_date: this.item.update_date || this.item.updated_date,
			updated_by: this.item.updated_by
		};
	}

	get configurationProps(): ConfigurationProps {
		return {
			archivedConfsModuleName: this.archivedConfsModuleName,
			docId: this.itemId,
			isLoading: this.isLoading,
			isNotFound: this.isNotFound,
			moduleName: this.moduleName,
			tabsItems: this.itemTabsItems,
			type: this.type!,
			updateInformation: this.updateInformation
		};
	}
}
