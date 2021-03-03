<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<item-component v-bind="configurationProps" />
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { ConfigurationTab, FullJSONTab, NotesTab, TaskListingTab } from '@/types';

import HeaderInfosMixin from '../header-infos';
import ConfigurationDocMixin from '@/mixins/data-workflows/doc/configuration-doc-mixin';

import { tailerContextConfs } from '@/store/modules/easy-firestore/tailer-context-conf';
import { tailerContextConfsArchive } from '@/store/modules/easy-firestore/tailer-context-conf-archive';

@Component
export default class TailerContextConfItemView extends Mixins(HeaderInfosMixin, ConfigurationDocMixin) {
	moduleName: string = tailerContextConfs.moduleName;
	archivedConfsModuleName: string = tailerContextConfsArchive.moduleName;

	get itemTabsItems(): [ConfigurationTab, TaskListingTab, FullJSONTab, NotesTab] | [] {
		if (Object.keys(this.item).length === 0) return [];

		return [this.configurationTab, this.fullJSONTab, this.notesTab];
	}

	get configurationData() {
		return [
			{
				component: 'view-header',
				props: {
					item: this.item,
					collection: this.moduleName,
					activeHeader: true,
					showDagLaunch: true,
					viewId: this.item.configuration_id,
					viewType: 'conf',
				},
			},
		];
	}
}
</script>
