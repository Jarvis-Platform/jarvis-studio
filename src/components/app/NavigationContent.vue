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

		<v-list class="pa-0" color="background">
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
				<v-list-item
					v-if="!item.hasOwnProperty('displayRule') || item.displayRule"
					:to="item.link"
					exact
					slot="activator"
				>
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
					v-if="!setting.hasOwnProperty('displayRule') || setting.displayRule"
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
import { Getter } from 'vuex-class';
import { Account, Link, User } from '@/types';
import {
	STORAGE_TO_STORAGE_RUNS_LISTING,
	STORAGE_TO_TABLES_RUNS_LISTING,
	TABLES_TO_TABLES_RUNS_LISTING,
	TABLE_TO_STORAGE_RUNS_LISTING,
	VM_LAUNCHER_RUNS_LISTING,
	WORKFLOW_STATUS_LISTING,
	CONTEXT_CONFIGURATIONS_LISTING,
	PROFILE,
	USERS,
	ACCOUNTS,
	CLOUD_FUNCTIONS,
} from '@/constants/router/routes-names';
import { SUPER_ADMIN } from '@/constants/user/roles';

import TreeView from '../data-models/TreeView.vue';
import packageJson from '../../../package.json';

@Component({
	components: { TreeView },
})
export default class NavigationContent extends Vue {
	@Prop({ type: Object, required: true }) drawer!: object;

	@Getter('filters/filteredAccounts') filteredAccounts: Account[];
	@Getter('user/user') user: User;

	mounted() {
		console.log(JSON.parse(this.$remoteConfig.getValue('showContexts')._value));
		console.log(JSON.parse(this.$remoteConfig.getValue('showContexts')._value)[this.filteredAccounts[0].id]);
	}

	get appName() {
		return packageJson.name.replace('-', ' ');
	}

	get analyticsItems(): Link[] {
		return [
			{
				icon: 'flare',
				title: 'Storage to Storage',
				link: { name: STORAGE_TO_STORAGE_RUNS_LISTING },
			},
			{
				icon: 'post_add',
				title: 'Storage to Tables',
				link: { name: STORAGE_TO_TABLES_RUNS_LISTING },
			},
			{
				icon: 'account_tree',
				title: 'Tables to Tables',
				link: { name: TABLES_TO_TABLES_RUNS_LISTING },
			},
			{
				icon: 'share',
				title: 'Table to Storage',
				link: { name: TABLE_TO_STORAGE_RUNS_LISTING },
			},
			{
				icon: 'dns',
				title: 'VM Launcher',
				link: { name: VM_LAUNCHER_RUNS_LISTING },
			},
			{
				icon: 'power',
				title: 'Workflow',
				link: { name: WORKFLOW_STATUS_LISTING },
			},
			{
				icon: 'inventory',
				title: 'Context',
				link: { name: CONTEXT_CONFIGURATIONS_LISTING },
				displayRule: () => true,
			},
		];
	}

	get settingsItems(): Link[] {
		const isSuperAdminRule = this.user.studioRoles === SUPER_ADMIN.roleCode;
		return [
			{
				title: 'Profile',
				icon: 'account_circle',
				link: { name: PROFILE },
			},
			{
				title: 'Users',
				icon: 'supervised_user_circle',
				link: { name: USERS },
				displayRule: isSuperAdminRule,
			},
			{
				title: 'Accounts',
				icon: 'business',
				link: { name: ACCOUNTS },
				displayRule: isSuperAdminRule,
			},
			{
				title: 'Cloud Function Configurations',
				icon: 'settings_ethernet',
				link: { name: CLOUD_FUNCTIONS },
				displayRule: isSuperAdminRule,
			},
		];
	}
}
</script>
