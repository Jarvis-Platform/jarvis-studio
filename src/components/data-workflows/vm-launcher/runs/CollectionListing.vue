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

import { vmLauncherRuns } from '@/store/modules/easy-firestore/vm-launcher-runs';
import { VM_LAUNCHER_RUNS_ITEM } from '@/constants/router/routes-names';
import {
	ACCOUNT,
	ACTIONS,
	DAG_EXECUTION_DATE,
	DAG_ID,
	ENVIRONMENT,
	STATUS,
} from '@/constants/data-workflows/listing/header-items';

@Component({
	components: { ListingComponent },
})
export default class CollectionListing extends Mixins(RunCollectionMixin) {
	get listingComponentProps(): ListingComponentProps {
		return {
			type: this.listingType,
			moduleName: vmLauncherRuns.moduleName,
			headers: [ACCOUNT, ENVIRONMENT, DAG_ID, STATUS, DAG_EXECUTION_DATE, ACTIONS],
			overriddenColumns: ['dag_id', 'dag_execution_date'],
			isOtherRunDisplay: this.isOtherRunDisplay,
			jobId: this.jobId,
			directExecutionPath: 'configuration_context.configuration.direct_execution',
		};
	}

	get routeName() {
		return VM_LAUNCHER_RUNS_ITEM;
	}
}
</script>
