<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<item-component v-bind="statusProps" />
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import HeaderInfosMixin from '../header-infos';
import StatusDocMixin from '@/mixins/data-workflows/doc/status-doc-mixin';
import { workflowStatus } from '@/store/modules/easy-firestore/workflow-status';

@Component
export default class WorkflowStatusItemView extends Mixins(HeaderInfosMixin, StatusDocMixin) {
	moduleName: string = workflowStatus.moduleName;

	get itemTabsItems() {
		if (Object.keys(this.item).length === 0) return [];

		return [
			{
				label: 'Status',
				href: 'configuration',
				component: {
					name: 'overview-component',
					props: {
						data: this.statusData,
					},
				},
			},
			{
				label: 'Full Json',
				href: 'full-json',
				component: {
					name: 'view-json',
					props: {
						json: this.item,
						jsonId: this.itemId,
					},
				},
			},
			{
				label: 'Conversation',
				href: 'conversation',
				component: {
					name: 'notes-tab',
					props: {},
				},
			},
		];
	}

	get statusData() {
		return [
			{
				component: 'view-header',
				props: {
					item: this.item,
					collection: this.moduleName,
					activeHeader: false,
					viewId: this.item.id,
					viewType: 'status',
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
							id: 'jobs',
							label: 'Jobs',
							value: Object.keys(this.item.jobs).length,
						},
						{
							id: 'last_modified',
							label: 'Las modified',
							value: this.$moment(this.item.last_modified).format('YYYY/MM/DD - HH:mm:ss'),
						},
						{
							id: 'target_dag',
							label: 'Target Dag',
							value: this.item.target_dag,
						},
						{
							id: 'target_dag_last_executed',
							label: 'Target Dag last executed',
							value: this.$moment(this.item.target_dag_last_executed).format('YYYY/MM/DD - HH:mm:ss'),
						},
					],
				},
			},
		];
	}
}
</script>
