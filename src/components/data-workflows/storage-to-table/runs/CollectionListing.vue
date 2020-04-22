<template>
	<listing-component v-bind="listingComponentProps">
		<template v-slot:gcs_triggering_file="{ item: { id, gcs_triggering_file } }">
			<router-link :to="{ name: routeName, params: { id } }">
				<span class="font-weight-medium">{{ gcs_triggering_file }}</span>
			</router-link>
		</template>

		<template v-slot:dag_execution_date="{ item: { dag_execution_date } }">
			{{ dag_execution_date | moment('YYYY/MM/DD - HH:mm') }}
		</template>
	</listing-component>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator';
import { ListingComponentProps } from '@/types';

import RunCollectionMixin from '@/mixins/data-workflows/collection/run-collection-mixin';
import ListingComponent from '@/components/data-workflows/common/listing/ListingComponent.vue';

import { mirrorExcGcsToGbqRuns } from '@/store/modules/easy-firestore/mirror-exc-gcs-to-gbq-runs';
import { STORAGE_TO_TABLE_RUNS_ITEM } from '@/constants/router/routes-names';
import {
	ACCOUNT,
	ACTIONS,
	DAG_EXECUTION_DATE,
	ENVIRONMENT,
	GBQ_TABLE_REFRESHED,
	GCS_TRIGGERING_FILE,
	STATUS,
} from '@/constants/data-workflows/listing/header-items';

@Component({
	components: { ListingComponent },
})
export default class CollectionListing extends Mixins(RunCollectionMixin) {
	get listingComponentProps(): ListingComponentProps {
		return {
			type: this.listingType,
			moduleName: mirrorExcGcsToGbqRuns.moduleName,
			headers: [ACCOUNT, ENVIRONMENT, GBQ_TABLE_REFRESHED, GCS_TRIGGERING_FILE, STATUS, DAG_EXECUTION_DATE, ACTIONS],
			overriddenColumns: ['gcs_triggering_file', 'dag_execution_date'],
			isOtherRunDisplay: this.isOtherRunDisplay,
			jobId: this.jobId,
		};
	}

	get routeName() {
		return STORAGE_TO_TABLE_RUNS_ITEM;
	}
}
</script>
