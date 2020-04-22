<template>
	<div>
		<data-overview-header title="Page not found" />
		<data-overview-content />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DataOverviewHeader from '@/components/app/data-overview/DataOverviewHeader.vue';
import DataOverviewContent from '@/components/app/data-overview/DataOverviewContent.vue';

@Component({
	components: { DataOverviewHeader, DataOverviewContent },
})
export default class NotFound extends Vue {}
</script>
