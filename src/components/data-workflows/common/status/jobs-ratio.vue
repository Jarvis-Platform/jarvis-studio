<template>
	<v-progress-circular
		:rotate="270"
		:size="35"
		:value="jobsLength > 0 ? (executedJobs.length / jobsLength) * 100 : 0"
		color="green"
	>
		{{ executedJobs.length }}
	</v-progress-circular>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class JobsRatio extends Vue {
	@Prop({ type: Object, required: true }) jobs!: any; // TODO: Type

	get jobsLength() {
		return Object.values(this.jobs).length;
	}

	get executedJobs() {
		return Object.values(this.jobs).filter((job) => job.executed === true);
	}
}
</script>
