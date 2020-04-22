<template>
	<div>
		<v-list class="pa-0">
			<v-list-item>
				<v-list-item-content v-if="!drawer.mini">
					<v-list-item-title>
						<h2 class="text-uppercase">{{ appName }}</h2>
					</v-list-item-title>
				</v-list-item-content>

				<v-list-item-action>
					<v-btn icon @click.stop="drawer.mini = !drawer.mini">
						<v-icon large color="complementary">
							{{ drawer.mini ? 'keyboard_arrow_right' : 'keyboard_arrow_left' }}
						</v-icon>
					</v-btn>
				</v-list-item-action>
			</v-list-item>
		</v-list>

		<v-divider v-if="!drawer.mini" />

		<v-list class="pa-0">
			<v-list-item to="/" exact>
				<v-list-item-action>
					<v-icon>home</v-icon>
				</v-list-item-action>

				<v-list-item-content>
					<v-list-item-title>Project Overview</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>

		<v-divider />

		<v-list v-if="!drawer.mini" subheader>
			<v-subheader class="text-uppercase">Data models</v-subheader>
			<tree-view />
		</v-list>

		<v-divider />

		<v-list subheader>
			<v-subheader v-if="!drawer.mini" class="text-uppercase">Data Workflows</v-subheader>

			<v-tooltip
				v-slot:activator="{ on }"
				v-for="item in analyticsItems"
				:key="item.title"
				:disabled="!drawer.mini"
				right
			>
				<v-list-item :to="item.link" exact slot="activator">
					<v-list-item-action>
						<v-icon v-html="item.icon" />
					</v-list-item-action>

					<v-list-item-content>
						<v-list-item-title v-text="item.title" />
					</v-list-item-content>
				</v-list-item>
			</v-tooltip>
		</v-list>

		<v-divider />

		<v-list subheader>
			<v-subheader v-if="!drawer.mini" class="text-uppercase">Settings</v-subheader>

			<template v-for="setting in settingsItems">
				<v-list-item
					v-if="!setting.hasOwnProperty('displayRule') || setting.displayRule()"
					:key="setting.title"
					:to="setting.link"
				>
					<v-list-item-action>
						<v-icon v-html="setting.icon" />
					</v-list-item-action>

					<v-list-item-content>
						<v-list-item-title v-text="setting.title" />
					</v-list-item-content>
				</v-list-item>
			</template>
		</v-list>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TreeView from '../data-models/TreeView.vue';

import packageJson from '../../../package.json';

@Component({
	components: { TreeView }
})
export default class NavigationContent extends Vue {
	@Prop({ type: Object, required: true }) drawer!: object;
	@Prop({ type: Array, required: true }) analyticsItems!: object;
	@Prop({ type: Array, required: true }) settingsItems!: object;

	get appName() {
		return packageJson.name.replace('-', ' ');
	}
}
</script>
