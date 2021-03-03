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
import ConfigurationStatus from '@/components/data-workflows/common/configuration/ConfigurationStatus.vue';

import HeaderInfosMixin from '../header-infos';

import { tailerContextConfs } from '@/store/modules/easy-firestore/tailer-context-conf';
import { CONTEXT_CONFIGURATIONS_ITEM } from '@/constants/router/routes-names';
import {
	ACCOUNT,
	ACTIONS,
	ACTIVATED,
	CONF_WORKFLOW_LENGTH,
	DEFAULT_BQ_DATASET,
	ENVIRONMENT,
	ID,
} from '@/constants/data-workflows/listing/header-items';
import ConfigurationCollectionMixin from '@/mixins/data-workflows/collection/configuration-collection-mixin';

@Component({
	components: { ConfigurationStatus },
})
export default class TailerContextConfListingView extends Mixins(HeaderInfosMixin, ConfigurationCollectionMixin) {
	moduleName: string = tailerContextConfs.moduleName;
	overriddenColumns: string[] = ['id'];

	get routeName() {
		return CONTEXT_CONFIGURATIONS_ITEM;
	}

	get headers() {
		return [ACCOUNT, ENVIRONMENT, ID, DEFAULT_BQ_DATASET, CONF_WORKFLOW_LENGTH, ACTIVATED, ACTIONS];
	}
}
</script>
