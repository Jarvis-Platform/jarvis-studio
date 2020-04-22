<template>
	<div class="d-flex justify-center">
		<component :is="componentName" isOtherRunDisplay :job-id="doc.job_id" />
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AnyObject, Doc } from '@/types';
import * as CollectionsListings from '@/components/data-workflows/runs-collections';
import ParametersTable from '@/components/data-workflows/common/item/parameters/ParametersTable.vue';

@Component({
	components: { ParametersTable },
})
export default class OtherRuns extends Vue {
	@Prop({ type: Object, required: true }) private doc!: Doc;
	@Prop({ type: String, required: true }) private moduleName!: Doc;

	get componentName(): string {
		const collectionsListings: AnyObject = CollectionsListings;
		return Object.values(collectionsListings).find((collection) => collection.moduleName === this.moduleName)
			.collectionListing;
	}
}
</script>
