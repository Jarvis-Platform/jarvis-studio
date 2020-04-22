<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<listing-component
			:type="listingType"
			:module-name="moduleName"
			:headers="headers"
			:overridden-columns="overriddenColumns"
			sortBy="id"
		>
			<template v-slot:id="{ item: { id } }">
				<router-link :to="{ name: routeName, params: { id } }">
					<span class="font-weight-medium">{{ id }}</span>
				</router-link>
			</template>
			<template v-slot:source="{ item: { source } }">
				{{ source.type === 'gcs' ? source.gcs_source_bucket : 'unknown' }}
			</template>
		</listing-component>
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import HeaderInfosMixin from '../header-infos';
import ConfigurationCollectionMixin from '@/mixins/data-workflows/collection/configuration-collection-mixin';

import { storageToTablesConfs } from '@/store/modules/easy-firestore/storage-to-tables-confs';
import { STORAGE_TO_TABLES_CONFIGURATIONS_ITEM } from '@/constants/router/routes-names';

@Component
export default class StorageToTablesConfigurationsListingView extends Mixins(
	HeaderInfosMixin,
	ConfigurationCollectionMixin
) {
	moduleName: string = storageToTablesConfs.moduleName;
	overriddenColumns: string[] = ['id', 'source'];

	get routeName() {
		return STORAGE_TO_TABLES_CONFIGURATIONS_ITEM;
	}

	get headers() {
		return [
			{
				text: 'Account ID',
				align: 'left',
				sortable: true,
				value: 'account',
			},
			{
				text: 'Environment',
				align: 'left',
				sortable: true,
				value: 'environment',
			},
			{
				text: 'Configuration id',
				align: 'left',
				sortable: true,
				value: 'id',
			},
			{ text: 'Source Type', align: 'left', sortable: true, value: 'source.type' },
			{ text: 'Source Name', align: 'left', sortable: true, value: 'source' },
			{
				text: 'Destinations',
				align: 'left',
				sortable: true,
				value: 'destinations.length',
			},
			{
				text: 'Tables',
				align: 'left',
				sortable: true,
				value: 'destinations[0].tables.length',
			},
			{
				text: 'Status',
				align: 'left',
				sortable: true,
				value: 'activated',
			},
			{
				text: 'Actions',
				align: 'center',
				sortable: false,
				value: 'actions',
			},
		];
	}
}
</script>
