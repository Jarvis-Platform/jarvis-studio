<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<listing-component
			:type="listingType"
			:module-name="moduleName"
			:headers="headers"
			:overridden-columns="overriddenColumns"
			sort-by="id"
			sort-desc
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

import { vmLauncherConfs } from '@/store/modules/easy-firestore/vm-launcher-confs';
import { VM_LAUNCHER_CONFIGURATIONS_ITEM } from '@/constants/router/routes-names';
import {
	ACCOUNT,
	ACTIONS,
	ACTIVATED,
	ENVIRONMENT,
	GCS_FILE_EXCHANGE_BUCKET,
	ID,
	WORKING_DIR,
} from '@/constants/data-workflows/listing/header-items';

@Component
export default class VmLauncherConfigurationsListingView extends Mixins(
	HeaderInfosMixin,
	ConfigurationCollectionMixin
) {
	moduleName: string = vmLauncherConfs.moduleName;
	overriddenColumns: string[] = ['id'];

	get routeName() {
		return VM_LAUNCHER_CONFIGURATIONS_ITEM;
	}

	get headers() {
		return [ACCOUNT, ENVIRONMENT, ID, GCS_FILE_EXCHANGE_BUCKET, WORKING_DIR, ACTIVATED, ACTIONS];
	}
}
</script>
