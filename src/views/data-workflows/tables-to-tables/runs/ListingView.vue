<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<tables-to-tables-collection-listing />
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import HeaderInfosMixin from '../header-infos';
import CollectionMixin from '@/mixins/data-workflows/collection/collection-mixin';
import { TablesToTables } from '@/components/data-workflows/runs-collections';

@Component({
	components: { TablesToTablesCollectionListing: TablesToTables.collectionListing },
})
export default class TablesToTablesRunsListingView extends Mixins(HeaderInfosMixin, CollectionMixin) {}
</script>
