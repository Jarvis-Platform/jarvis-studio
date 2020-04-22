<template>
	<div>
		<data-management-header :workflow-name="workflowName" :tabsItems="tabsItems" />
		<gbq-to-gcs-collection-listing />
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import HeaderInfosMixin from '../header-infos';
import CollectionMixin from '@/mixins/data-workflows/collection/collection-mixin';
import { GbqToGcs } from '@/components/data-workflows/runs-collections';

@Component({
	components: { GbqToGcsCollectionListing: GbqToGcs.collectionListing },
})
export default class GbqToGcsRunsListingView extends Mixins(HeaderInfosMixin, CollectionMixin) {}
</script>
