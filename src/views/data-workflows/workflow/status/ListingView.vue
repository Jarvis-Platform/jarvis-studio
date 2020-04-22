<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<listing-component
			:type="listingType"
			:module-name="moduleName"
			:headers="headers"
			:overridden-columns="overriddenColumns"
		>
			<template v-slot:id="{ item: { id } }">
				<router-link :to="{ name: routeName, params: { id } }">
					<span class="font-weight-medium">{{ id }}</span>
				</router-link>
			</template>

			<template v-slot:jobs="{ item: { jobs } }">
				{{ Object.keys(jobs).length }}
			</template>

			<template v-slot:triggered_jobs="{ item: { jobs } }">
				<v-progress-circular
					:rotate="270"
					:size="35"
					:value="(Object.values(jobs).filter((job) => (job.executed = true)).length / Object.keys(jobs).length) * 100"
					color="green"
				>
					{{ Object.values(jobs).filter((job) => (job.executed = true)).length }}
				</v-progress-circular>
			</template>

			<template v-slot:last_update_date_from_now="{ item: { last_modified } }">
				{{ last_modified | moment('from', 'now') }}
			</template>

			<template v-slot:last_fire_date_from_now="{ item: { target_dag_last_executed } }">
				{{ target_dag_last_executed | moment('from', 'now') }}
			</template>
		</listing-component>
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import HeaderInfosMixin from '../header-infos';
import StatusCollectionMixin from '@/mixins/data-workflows/collection/status-collection-mixin';

import { workflowStatus } from '@/store/modules/easy-firestore/workflow-status';
import { WORKFLOW_STATUS_ITEM } from '@/constants/router/routes-names';
import {
	ACTIONS,
	ID,
	JOBS,
	LAST_FIRE_DATE_FROM_NOW,
	LAST_UPDATE_FROM_NOW,
	TRIGGERED_JOBS,
} from '@/constants/data-workflows/listing/header-items';

@Component
export default class WorkflowStatusListingView extends Mixins(HeaderInfosMixin, StatusCollectionMixin) {
	moduleName: string = workflowStatus.moduleName;
	overriddenColumns: string[] = [
		'id',
		'jobs',
		'triggered_jobs',
		'last_update_date_from_now',
		'last_fire_date_from_now',
	];

	get routeName() {
		return WORKFLOW_STATUS_ITEM;
	}

	get headers() {
		return [ID, JOBS, TRIGGERED_JOBS, LAST_UPDATE_FROM_NOW, LAST_FIRE_DATE_FROM_NOW, ACTIONS];
	}
}
</script>
