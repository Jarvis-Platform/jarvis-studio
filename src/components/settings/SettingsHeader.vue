<template>
	<v-toolbar dense tabs color="primary">
		<v-toolbar-title class="pl-2 display-1">{{ headerTitle }}</v-toolbar-title>
		<p>Hello</p>

		<v-tabs color="white" slider-color="white" slot="extension" background-color="primary">
			<v-tab v-for="tabsItem in tabsItems" :key="tabsItem.id" :to="tabsItem.link">
				<span class="pl-2 pr-2">{{ tabsItem.title }}</span>
			</v-tab>
		</v-tabs>
	</v-toolbar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SettingsHeader extends Vue {
	@Prop(Array) tabsItems?: [];
	@Prop(String) headerTitle?: string;
}
</script>

<style lang="scss" scoped>
.disabled {
	color: black;
	pointer-events: none;
}
</style>
