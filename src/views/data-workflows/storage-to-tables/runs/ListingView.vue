<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<storage-to-tables-collection-listing />
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import HeaderInfosMixin from '../header-infos';
import CollectionMixin from '@/mixins/data-workflows/collection/collection-mixin';
import { StorageToTables } from '@/components/data-workflows/runs-collections';

@Component({
	components: { StorageToTablesCollectionListing: StorageToTables.collectionListing },
})
export default class StorageToTablesRunsListingView extends Mixins(HeaderInfosMixin, CollectionMixin) {}
</script>
