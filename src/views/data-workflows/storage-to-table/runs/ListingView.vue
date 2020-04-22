<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<storage-to-table-collection-listing />
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import HeaderInfosMixin from '../header-infos';
import CollectionMixin from '@/mixins/data-workflows/collection/collection-mixin';
import { StorageToTable } from '@/components/data-workflows/runs-collections';

@Component({
	components: { StorageToTableCollectionListing: StorageToTable.collectionListing },
})
export default class StorageToTableRunsListingView extends Mixins(HeaderInfosMixin, CollectionMixin) {}
</script>
