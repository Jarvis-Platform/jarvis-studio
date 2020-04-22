<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<vm-launcher-collection-listing />
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import HeaderInfosMixin from '../header-infos';
import CollectionMixin from '@/mixins/data-workflows/collection/collection-mixin';
import { VmLauncher } from '@/components/data-workflows/runs-collections';

@Component({
	components: { VmLauncherCollectionListing: VmLauncher.collectionListing },
})
export default class VmLauncherRunsListingView extends Mixins(HeaderInfosMixin, CollectionMixin) {}
</script>
