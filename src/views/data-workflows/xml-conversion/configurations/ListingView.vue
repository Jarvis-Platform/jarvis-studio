<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<listing-component
			:type="listingType"
			:module-name="moduleName"
			:headers="headers"
			:overridden-columns="overriddenColumns"
			direct-execution-path="direct_execution"
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

import { xmlConversionConf } from '@/store/modules/easy-firestore/xml-conversion-conf';
import { XML_CONVERSION_CONFIGURATIONS_ITEM } from '@/constants/router/routes-names';
import {
	ACCOUNT,
	ACTIONS,
	ENVIRONMENT,
	GCP_PROJECT_ID,
	GCS_BUCKET,
	GCS_WORKING_DIRECTORY,
	ID,
} from '@/constants/data-workflows/listing/header-items';
import ConfigurationCollectionMixin from '@/mixins/data-workflows/collection/configuration-collection-mixin';

@Component({
	components: { ConfigurationStatus },
})
export default class TailerContextConfListingView extends Mixins(HeaderInfosMixin, ConfigurationCollectionMixin) {
	moduleName: string = xmlConversionConf.moduleName;
	overriddenColumns: string[] = ['id'];

	get routeName() {
		return XML_CONVERSION_CONFIGURATIONS_ITEM;
	}

	get headers() {
		return [ACCOUNT, ENVIRONMENT, ID, GCP_PROJECT_ID, GCS_BUCKET, GCS_WORKING_DIRECTORY, ACTIONS];
	}
}
</script>
