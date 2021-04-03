<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<item-component v-bind="configurationProps" />
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import HeaderInfosMixin from '../header-infos';
import DirectExecutionIcon from '@/components/data-workflows/common/item/parameters/custom-parameters-item/DirectExecutionIcon.vue';
import ConfigurationDocMixin from '@/mixins/data-workflows/doc/configuration-doc-mixin';

import { vmLauncherConfs } from '@/store/modules/easy-firestore/vm-launcher-confs';
import { vmLauncherConfArchive } from '@/store/modules/easy-firestore/vm-launcher-conf-archive';

@Component
export default class VmLauncherConfigurationsItemView extends Mixins(HeaderInfosMixin, ConfigurationDocMixin) {
	moduleName: string = vmLauncherConfs.moduleName;
	archivedConfsModuleName: string = vmLauncherConfArchive.moduleName;

	get configurationData() {
		return [
			{
				component: 'view-header',
				props: {
					item: this.item,
					collection: this.moduleName,
					activeHeader: true,
					viewId: this.item.id,
					viewType: 'conf',
				},
			},
			{
				component: 'parameters-list',
				props: {
					groupTitle: 'Context',
					tooltip: true,
					description: 'Context of the VM Launcher configuration',
					paramItems: [
						{
							id: 'account',
							label: 'Account',
							value: this.item.account,
						},
						{
							id: 'environment',
							label: 'Environment',
							value: this.item.environment,
						},
						{
							id: 'direct_execution',
							label: 'Direct Execution',
							component: DirectExecutionIcon,
							properties: {
								directExecution: this.item.direct_execution,
							},
						},
					],
				},
			},
		];
	}
}
</script>
