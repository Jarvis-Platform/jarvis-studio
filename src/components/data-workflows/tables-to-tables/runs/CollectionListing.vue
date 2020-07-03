<template>
	<listing-component v-bind="listingComponentProps">
		<template v-slot:dag_id="{ item: { id, dag_id } }">
			<router-link :to="{ name: routeName, params: { id } }">
				<span class="font-weight-medium">{{ dag_id }}</span>
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

import { getGbqToGbqRuns } from '@/store/modules/easy-firestore/get-gbq-to-gbq-runs';
import { TABLES_TO_TABLES_RUNS_ITEM } from '@/constants/router/routes-names';
import {
	ACCOUNT,
	ACTIONS,
	DAG_EXECUTION_DATE,
	DAG_ID,
	ENVIRONMENT,
	STATUS,
	WORKFLOW_LENGTH,
} from '@/constants/data-workflows/listing/header-items';

@Component({
	components: { ListingComponent },
})
export default class CollectionListing extends Mixins(RunCollectionMixin) {
	get listingComponentProps(): ListingComponentProps {
		return {
			type: this.listingType,
			moduleName: getGbqToGbqRuns.moduleName,
			headers: [ACCOUNT, ENVIRONMENT, DAG_ID, WORKFLOW_LENGTH, STATUS, DAG_EXECUTION_DATE, ACTIONS],
			overriddenColumns: ['dag_id', 'dag_execution_date'],
			isOtherRunDisplay: this.isOtherRunDisplay,
			jobId: this.jobId,
		};
	}

	get routeName() {
		return TABLES_TO_TABLES_RUNS_ITEM;
	}
}
</script>
