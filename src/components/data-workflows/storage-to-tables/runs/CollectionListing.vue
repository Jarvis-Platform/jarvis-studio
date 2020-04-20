<template>
	<listing-component v-bind="listingComponentProps">
		<template v-slot:triggering_file="{ item: { id, triggering_file } }">
			<router-link :to="{ name: routeName, params: { id } }">
				<span class="font-weight-medium">{{ triggering_file }}</span>
			</router-link>
		</template>
		<template v-slot:configuration_context.source="{ item: { configuration_context: { source } } }">
			{{ source ? (source.type === 'gcs' ? source.gcs_source_bucket : source.sftp_host) : 'waiting...' }}
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

import { storageToTablesRuns } from '@/store/modules/easy-firestore/storage-to-tables-runs';
import { STORAGE_TO_TABLES_RUNS_ITEM } from '@/constants/router/routes-names';
import {
	ACCOUNT,
	ACTIONS,
	DAG_EXECUTION_DATE,
	ENVIRONMENT,
	STATUS,
	TRIGGERING_FILE
} from '@/constants/data-workflows/listing/header-items';

@Component({
	components: { ListingComponent }
})
export default class CollectionListing extends Mixins(RunCollectionMixin) {
	get listingComponentProps(): ListingComponentProps {
		return {
			type: this.listingType,
			moduleName: storageToTablesRuns.moduleName,
			headers: [
				ACCOUNT,
				ENVIRONMENT,
				TRIGGERING_FILE,
				{
					text: 'Source Storage',
					sortable: true,
					value: 'source_storage'
				},
				{
					text: 'Destinations',
					sortable: true,
					value: 'configuration_context.destinations.length'
				},
				STATUS,
				DAG_EXECUTION_DATE,
				ACTIONS
			],
			overriddenColumns: ['triggering_file', 'configuration_context.source', 'dag_execution_date'],
			isOtherRunDisplay: this.isOtherRunDisplay,
			jobId: this.jobId
		};
	}

	get routeName() {
		return STORAGE_TO_TABLES_RUNS_ITEM;
	}
}
</script>
