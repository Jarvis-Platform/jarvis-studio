<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<item-component v-bind="configurationProps" />
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import HeaderInfosMixin from '../header-infos';
import ConfigurationDocMixin from '@/mixins/data-workflows/doc/configuration-doc-mixin';

import { workflowConfs } from '@/store/modules/easy-firestore/workflow-confs';
import { workflowConfArchive } from '@/store/modules/easy-firestore/workflow-conf-archive';

@Component
export default class WorkflowConfigurationsItemView extends Mixins(HeaderInfosMixin, ConfigurationDocMixin) {
	moduleName: string = workflowConfs.moduleName;
	archivedConfsModuleName: string = workflowConfArchive.moduleName;

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
					description: this.item.short_description,
				},
			},
			{
				component: 'parameters-list',
				props: {
					groupTitle: 'Context',
					tooltip: true,
					description: 'Context of the Workflow configuration',
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
					],
					rows: [{ job_id: this.item.target_dag }],
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
					],
					rows: this.item.authorized_job_ids.map((val: string) => {
						return { job_id: val };
					}),
					lineNumbers: true,
					searchOptionsEnabled: true,
				},
			},
		];
	}
}
</script>
