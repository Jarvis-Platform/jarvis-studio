<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<listing-component
			:type="listingType"
			:module-name="moduleName"
			:headers="headers"
			:custom-data-fetching="customDataFetching"
			:overridden-columns="overriddenColumns"
			show-delete-action
		>
			<template v-slot:table_name="{ item: { bucket_id, id, table_name } }">
				<router-link :to="{ name: routeName, params: { bucketId: bucket_id, id } }">
					<span class="font-weight-medium">{{ table_name }}</span>
				</router-link>
			</template>
		</listing-component>
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { AnyObject, WhereConfFilter } from '@/types';
import { Getter, State } from 'vuex-class';

import HeaderInfosMixin from '../header-infos';
import ConfigurationCollectionMixin from '@/mixins/data-workflows/collection/configuration-collection-mixin';

import { mirrorExcGcsToGbqConfs } from '@/store/modules/easy-firestore/mirror-exc-gcs-to-gbq-confs';
import { STORAGE_TO_TABLE_CONFIGURATIONS_ITEM } from '@/constants/router/routes-names';
import {
	ACCOUNT,
	ACTIONS,
	ACTIVATED,
	ENVIRONMENT,
	GBQ_DATASET,
	GCP_PROJECT,
	TABLE_NAME,
} from '@/constants/data-workflows/listing/header-items';

@Component
export default class StorageToTableConfigurationsListingView extends Mixins(
	HeaderInfosMixin,
	ConfigurationCollectionMixin
) {
	moduleName: string = mirrorExcGcsToGbqConfs.moduleName;
	overriddenColumns: string[] = ['table_name'];

	@State((state) => state.mirrorExcGcsToGbqConfs.data) mirrorExcGcsToGbqConfs!: Object;
	@State((state) => state.mirrorExcGcsToGbqConfDetails.data) mirrorExcGcsToGbqConfDetails!: Object;

	@Getter('filters/whereConfFilter') whereConfFilter!: WhereConfFilter;

	async customDataFetching() {
		let items: AnyObject[] = [];

		await this.$store.dispatch(`${this.moduleName}/closeDBChannel`, { clearModule: true });
		await this.$store.dispatch(`${this.moduleName}/fetchAndAdd`);

		for (const item of Object.values(this.mirrorExcGcsToGbqConfs)) {
			const bucketId = item.id;

			await this.$store.dispatch('mirrorExcGcsToGbqConfDetails/closeDBChannel', { clearModule: true });
			await this.$store
				.dispatch('mirrorExcGcsToGbqConfDetails/fetchAndAdd', { bucketId, where: this.whereConfFilter })
				.then(() => {
					Object.values(this.mirrorExcGcsToGbqConfDetails).forEach((val) => (val.bucket_id = bucketId));
					items.push(Object.values(this.mirrorExcGcsToGbqConfDetails));
				});
		}

		return items.flat();
	}

	get routeName() {
		return STORAGE_TO_TABLE_CONFIGURATIONS_ITEM;
	}

	get headers() {
		return [ACCOUNT, ENVIRONMENT, TABLE_NAME, GCP_PROJECT, GBQ_DATASET, ACTIVATED, ACTIONS];
	}
}
</script>
