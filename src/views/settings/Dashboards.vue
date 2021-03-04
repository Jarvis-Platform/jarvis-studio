<template>
	<div>
		<v-toolbar dense tabs color="primary">
			<v-toolbar-title class="pl-2 display-1">Dashboards</v-toolbar-title>
		</v-toolbar>

		<v-tabs v-model="currentTab" slider-color="white" slot="extension" color="transparent" background-color="primary">
			<v-tab v-for="tabsItem in tabsItems" :key="tabsItem.id">
				<span class="pl-2 pr-2">{{ tabsItem.title }}</span>
			</v-tab>
		</v-tabs>

		<v-container>
			<v-tabs-items v-model="currentTab">
				<v-tab-item key="Runs">
					<v-card>
						<p>Runs</p>
					</v-card>
				</v-tab-item>

				<v-tab-item key="Configurations">
					<v-card>
						<p>Configurations</p>
					</v-card>
				</v-tab-item>

				<v-tab-item key="Users">
					<v-card>
						<p>Users</p>
					</v-card>
				</v-tab-item>

				<v-tab-item key="Data Models">
					<v-card>
						<p>Data Models</p>
					</v-card>
				</v-tab-item>
			</v-tabs-items>
		</v-container>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Dashboards extends Vue {
	currentTab = '';

	get tabsItems() {
		return [
			{ id: 1, title: 'Runs' },
			{ id: 2, title: 'Configurations' },
			{ id: 3, title: 'Users' },
			{ id: 4, title: 'Data Models' },
		];
	}
}
</script>
