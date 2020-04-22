<template>
	<v-toolbar dense color="primary" dark extended extension-height="300" text>
		<v-toolbar-title class="mx-auto text-center" slot="extension">
			<h2>{{ title }}</h2>
			<span>{{ subTitle }}</span>
		</v-toolbar-title>
	</v-toolbar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DataOverviewHeader extends Vue {
	@Prop({ type: String, required: true }) title!: string;
	@Prop(String) subTitle!: string;
}
</script>
