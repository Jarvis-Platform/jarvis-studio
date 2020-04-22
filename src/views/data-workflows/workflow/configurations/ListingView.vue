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
		</listing-component>
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import HeaderInfosMixin from '../header-infos';
import ConfigurationCollectionMixin from '@/mixins/data-workflows/collection/configuration-collection-mixin';

import { workflowConfs } from '@/store/modules/easy-firestore/workflow-confs';
import { WORKFLOW_CONFIGURATIONS_ITEM } from '@/constants/router/routes-names';
import {
	ACCOUNT,
	ACTIONS,
	ACTIVATED,
	AUTHORIZED_JOB_IDS_LENGTH,
	ENVIRONMENT,
	ID,
	TARGET_DAG,
} from '@/constants/data-workflows/listing/header-items';

@Component
export default class WorkflowConfigurationsListingView extends Mixins(HeaderInfosMixin, ConfigurationCollectionMixin) {
	moduleName: string = workflowConfs.moduleName;
	overriddenColumns: string[] = ['id'];

	get routeName() {
		return WORKFLOW_CONFIGURATIONS_ITEM;
	}

	get headers() {
		return [ACCOUNT, ENVIRONMENT, ID, TARGET_DAG, AUTHORIZED_JOB_IDS_LENGTH, ACTIVATED, ACTIONS];
	}
}
</script>
