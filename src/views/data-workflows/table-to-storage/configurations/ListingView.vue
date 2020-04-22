<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<listing-component
			:type="listingType"
			:module-name="moduleName"
			:headers="headers"
			:overridden-columns="overriddenColumns"
			sort-by="id"
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

import { tableToStorageConfs } from '@/store/modules/easy-firestore/table-to-storage-confs';
import { TABLE_TO_STORAGE_CONFIGURATIONS_ITEM } from '@/constants/router/routes-names';
import {
	ACCOUNT,
	ACTIONS,
	ACTIVATED,
	ENVIRONMENT,
	GCP_PROJECT,
	GCS_DEST_BUCKET,
	GCS_DEST_PREFIX,
	ID,
} from '@/constants/data-workflows/listing/header-items';

@Component
export default class TableToStorageConfigurationsListingView extends Mixins(
	HeaderInfosMixin,
	ConfigurationCollectionMixin
) {
	moduleName: string = tableToStorageConfs.moduleName;
	overriddenColumns: string[] = ['id'];

	get routeName() {
		return TABLE_TO_STORAGE_CONFIGURATIONS_ITEM;
	}

	get headers() {
		return [ACCOUNT, ENVIRONMENT, ID, GCP_PROJECT, GCS_DEST_BUCKET, GCS_DEST_PREFIX, ACTIVATED, ACTIONS];
	}
}
</script>
