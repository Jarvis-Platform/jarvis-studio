<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<listing-component
			:type="listingType"
			:module-name="moduleName"
			:headers="headers"
			:overridden-columns="overriddenColumns"
			show-delete-action
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

import { mirrorExcGcsToGcsConfs } from '@/store/modules/easy-firestore/mirror-exc-gcs-to-gcs-confs';
import { GCS_TO_GCS_CONFIGURATIONS_ITEM } from '@/constants/router/routes-names';
import {
	ACCOUNT,
	ACTIONS,
	ACTIVATED,
	ENVIRONMENT,
	ID,
	NB_DESTINATION_BUCKET,
	NB_FILENAME_TEMPLATES,
	SOURCE_BUCKET,
} from '@/constants/data-workflows/listing/header-items';

@Component
export default class GcsToGcsConfigurationsListingView extends Mixins(HeaderInfosMixin, ConfigurationCollectionMixin) {
	moduleName: string = mirrorExcGcsToGcsConfs.moduleName;
	overriddenColumns: string[] = ['id'];

	get routeName() {
		return GCS_TO_GCS_CONFIGURATIONS_ITEM;
	}

	get headers() {
		return [ACCOUNT, ENVIRONMENT, ID, SOURCE_BUCKET, NB_DESTINATION_BUCKET, NB_FILENAME_TEMPLATES, ACTIVATED, ACTIONS];
	}
}
</script>
