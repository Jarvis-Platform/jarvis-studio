<template>
	<div>
		<data-management-header :workflow-name="workflowName" :tabsItems="tabsItems" />
		<gcs-to-gcs-collection-listing />
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import HeaderInfosMixin from '../header-infos';
import CollectionMixin from '@/mixins/data-workflows/collection/collection-mixin';
import { GcsToGcs } from '@/components/data-workflows/runs-collections';

@Component({
	components: { GcsToGcsCollectionListing: GcsToGcs.collectionListing },
})
export default class GcsToGcsRunsListingView extends Mixins(HeaderInfosMixin, CollectionMixin) {}
</script>
