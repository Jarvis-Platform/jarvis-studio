<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<item-component v-bind="configurationProps" />
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { ConfigurationTab, FullJSONTab, NotesTab } from '@/types';

import HeaderInfosMixin from '../header-infos';
import ConfigurationDocMixin from '@/mixins/data-workflows/doc/configuration-doc-mixin';

import { tailerContextConfs } from '@/store/modules/easy-firestore/tailer-context-conf';
import { tailerContextConfsArchive } from '@/store/modules/easy-firestore/tailer-context-conf-archive';

@Component
export default class TailerContextConfItemView extends Mixins(HeaderInfosMixin, ConfigurationDocMixin) {
	moduleName: string = tailerContextConfs.moduleName;
	archivedConfsModuleName: string = tailerContextConfsArchive.moduleName;

	get itemTabsItems(): [ConfigurationTab, FullJSONTab, NotesTab] | [] {
		if (Object.keys(this.item).length === 0) return [];

		return [this.configurationTab, this.fullJSONTab, this.notesTab];
	}

	get configurationData() {
		const formattedParameters = Object.values(this.item.parameters as { [name: string]: object }).map(
			(parameter, index) => ({
				name: Object.keys(this.item.parameters)[index],
				...parameter,
			})
		);

		return [
			{
				component: 'view-header',
				props: {
					item: this.item,
					collection: this.moduleName,
					activeHeader: true,
					viewId: this.item.configuration_id,
					viewType: 'conf',
				},
			},
			{
				component: 'parameters-list',
				props: {
					groupTitle: 'Context',
					tooltip: true,
					description: 'Context of the Storage to Storage configuration',
					paramItems: [
						{
							id: 'configuration_type',
							label: 'Configuration Type',
							value: 'context',
						},
						{
							id: 'configuration_id',
							label: 'Configuration ID',
							value: this.item.id,
						},
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
							id: 'activated',
							label: 'Activated',
							value: this.item.activated,
							default: true,
						},
						{
							id: 'archive',
							label: 'Archive',
							value: this.item.archived,
							default: false,
						},
					],
				},
			},
			{
				component: 'parameters-table',
				props: {
					tableTitle: 'Tables',
					description: 'Tables List to be loaded from files',
					columns: [
						{
							label: 'Name',
							field: 'name',
						},
						{
							label: 'Value',
							field: 'value',
						},
						{
							label: 'Type',
							field: 'type',
						},
						{
							label: 'Resource',
							field: 'resource',
						},
						{
							label: 'Description',
							field: 'description',
						},
					],
					rows: formattedParameters,
					overriddenRows: [
						{
							name: 'value',
							component: 'TruncatedDisplayValue',
							props: {
								parameters: formattedParameters,
							},
						},
					],
					searchOptionsEnabled: true,
				},
			},
		];
	}
}
</script>
