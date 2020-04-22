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

import { storageToStorageConfs } from '@/store/modules/easy-firestore/storage-to-storage-confs';
import { STORAGE_TO_STORAGE_CONFIGURATIONS_ITEM } from '@/constants/router/routes-names';
import {
	ACCOUNT,
	ACTIONS,
	ACTIVATED,
	ENVIRONMENT,
	ID,
	NB_FILENAME_TEMPLATES,
} from '@/constants/data-workflows/listing/header-items';

@Component
export default class StorageToStorageConfigurationsListingView extends Mixins(
	HeaderInfosMixin,
	ConfigurationCollectionMixin
) {
	moduleName: string = storageToStorageConfs.moduleName;
	overriddenColumns: string[] = ['id'];

	get routeName() {
		return STORAGE_TO_STORAGE_CONFIGURATIONS_ITEM;
	}

	get headers() {
		return [ACCOUNT, ENVIRONMENT, ID, NB_FILENAME_TEMPLATES, ACTIVATED, ACTIONS];
	}
}
</script>
