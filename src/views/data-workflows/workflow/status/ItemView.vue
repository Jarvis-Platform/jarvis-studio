<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<item-component v-bind="statusProps" />
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { StatusJob } from '@/types/status';

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
		const jobsLength = Object.keys(this.item.jobs).length;

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
							value: jobsLength ? jobsLength : '0',
						},
						{
							id: 'last_modified',
							label: 'Las modified',
							value: this.$moment(this.item.last_modified, '').format('YYYY/MM/DD - HH:mm:ss'),
						},
						{
							id: 'target_dag',
							label: 'Target Dag',
							value: this.item.target_dag,
						},
						{
							id: 'target_dag_last_executed',
							label: 'Target Dag last executed',
							value: this.$moment(this.item.target_dag_last_executed, '').format('YYYY/MM/DD - HH:mm:ss'),
						},
					],
				},
			},
			{
				component: 'parameters-table',
				props: {
					tableTitle: 'Target Job',
					description: 'Job to target',
					columns: [
						{
							label: 'Job ID',
							field: 'job_id',
						},
						{
							label: 'Execution date',
							field: 'target_dag_last_executed',
						},
					],
					rows: [{ job_id: this.item.target_dag, target_dag_last_executed: this.item.target_dag_last_executed }],
					lineNumbers: true,
					searchOptionsEnabled: false,
				},
			},
			{
				component: 'parameters-table',
				props: {
					tableTitle: 'Triggering Jobs',
					description: 'Jobs trigerring the workflow',
					columns: [
						{
							label: 'Job ID',
							field: 'job_id',
						},
						{
							label: 'Execution date',
							field: 'execution_date',
						},
						{
							label: 'Triggered',
							field: 'triggered',
						},
					],
					rows: Object.values(this.item.jobs as StatusJob[]).map((job, index: number) => {
						return {
							job_id: Object.keys(this.item.jobs)[index],
							execution_date: job.execution_date,
							triggered: job.executed,
						};
					}),
					lineNumbers: true,
					searchOptionsEnabled: true,
				},
			},
		];
	}
}
</script>
