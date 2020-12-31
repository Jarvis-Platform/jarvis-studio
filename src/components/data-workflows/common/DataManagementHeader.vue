<template>
	<v-toolbar dense tabs color="white">
		<v-toolbar-title class="pl-2 display-1">{{ workflowName }}</v-toolbar-title>

		<v-tabs slider-color="activemenu" slot="extension" color="activemenu" background-color="white">
			<v-tab v-for="tabsItem in tabsItems" :key="tabsItem.id" :to="tabsItem.link">
				<span class="pl-2 pr-2">{{ tabsItem.title }}</span>
			</v-tab>
		</v-tabs>
	</v-toolbar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DataManagementHeader extends Vue {
	@Prop({ type: String, required: true }) workflowName!: string;
	@Prop({ type: Array, required: true }) tabsItems!: [];
}
</script>
