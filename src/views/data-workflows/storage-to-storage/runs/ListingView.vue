<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<storage-to-storage-collection-listing />
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import HeaderInfosMixin from '../header-infos';
import CollectionMixin from '@/mixins/data-workflows/collection/collection-mixin';
import { StorageToStorage } from '@/components/data-workflows/runs-collections';

@Component({
	components: { StorageToStorageCollectionListing: StorageToStorage.collectionListing },
})
export default class StorageToStorageRunsListingView extends Mixins(HeaderInfosMixin, CollectionMixin) {}
</script>
