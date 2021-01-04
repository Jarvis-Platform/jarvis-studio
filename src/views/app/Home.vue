<template>
	<div>
		<data-overview-header title="Welcome to Tailer Studio" sub-title="Keep Calm and Ask for the Retail Data Tailor" />
		<data-overview-content />
		<!-- <home-announcements /> -->
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DataOverviewHeader from '@/components/app/data-overview/DataOverviewHeader.vue';
import DataOverviewContent from '@/components/app/data-overview/DataOverviewContent.vue';
import HomeAnnouncements from '@/components/app/data-overview/HomeAnnouncements.vue';

@Component({
	components: { DataOverviewHeader, DataOverviewContent, HomeAnnouncements },
})
export default class Home extends Vue {}
</script>
