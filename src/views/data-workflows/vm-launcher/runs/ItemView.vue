<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<item-component v-bind="runProps" />
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import HeaderInfosMixin from '../header-infos';
import RunDocMixin from '@/mixins/data-workflows/doc/run-doc-mixin';
import { vmLauncherRuns } from '@/store/modules/easy-firestore/vm-launcher-runs';

@Component
export default class VmLauncherRunsItemView extends Mixins(HeaderInfosMixin, RunDocMixin) {
	moduleName: string = vmLauncherRuns.moduleName;

	get runDetailsData() {
		return [
			{
				component: 'view-header',
				props: {
					item: this.item,
					collection: this.moduleName,
					activeHeader: true,
					viewId: this.item.id,
					viewType: 'run',
					runStatus: this.item.status,
				},
			},
			{
				component: 'parameters-list',
				props: {
					groupTitle: 'Run Details',
					tooltip: true,
					description: 'Details of the Storage to Storage run',
					paramItems: [
						{
							id: 'account',
							label: 'Account',
							value: this.item.account,
						},
						{
							id: 'environment',
							label: 'Environnement',
							value: this.item.environment,
						},
						{
							id: 'dag_id',
							label: 'Configuration Type',
							value: this.item.dag_id,
						},
						{
							id: 'job_id',
							label: 'Job Id',
							value: this.item.job_id,
						},
						{
							id: 'dag_execution_date',
							label: 'Execution Date',
							value: this.item.dag_execution_date,
						},
						{
							id: 'dag_run_id',
							label: 'Dag Run Id',
							value: this.item.dag_run_id,
						},
					],
				},
			},
		];
	}

	get configurationData() {
		return [
			{
				component: 'view-header',
				props: {
					item: this.item,
					collection: this.moduleName,
					activeHeader: false,
					viewId: this.item.dag_id,
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
							id: 'account',
							label: 'Account',
							value: this.item.account,
						},
						{
							id: 'environment',
							label: 'Environment',
							value: this.item.environment,
						},
					],
				},
			},
		];
	}
}
</script>
