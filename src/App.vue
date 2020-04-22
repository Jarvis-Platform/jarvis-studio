<template>
	<v-app>
		<template v-if="showLayout">
			<app-bar
				class="elevate-content"
				@toggleNavigation="toggleNavigation"
				@toggleNotifications="toggleNotifications"
			/>

			<v-navigation-drawer
				v-model="showNavigation"
				:permanent="navigationDrawer.permanent"
				:mini-variant="navigationDrawer.mini"
				fixed
				app
				dark
				class="menu"
				width="300"
			>
				<navigation-content
					:drawer="navigationDrawer"
					:analytics-items="analyticsItems"
					:settings-items="settingsItems"
				/>
			</v-navigation-drawer>

			<v-navigation-drawer v-model="showNotifications" fixed app temporary right>
				<notification-content @closeNotifications="toggleNotifications" />
			</v-navigation-drawer>

			<v-footer class="elevate-content menu" app dark>
				<footer-content />
			</v-footer>
		</template>

		<v-content>
			<transition name="fade" mode="out-in">
				<keep-alive>
					<router-view :key="$route.fullPath" />
				</keep-alive>
			</transition>
		</v-content>
	</v-app>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import AppBar from '@/components/app/app-bar/AppBar.vue';
import NavigationContent from '@/components/app/NavigationContent.vue';
import NotificationContent from '@/components/app/NotificationContent.vue';
import FooterContent from '@/components/app/FooterContent.vue';

import { State, Getter } from 'vuex-class';

import { Link } from '@/types';
import { analyticsItems } from './navigation/analytics-items';
import { settingsItems } from './navigation/settings-items';

interface Drawer {
	permanent: boolean;
	mini: boolean;
}

@Component({
	components: { AppBar, FooterContent, NavigationContent, NotificationContent },
})
export default class App extends Vue {
	navigationDrawer: Drawer = { permanent: true, mini: false };
	showNavigation: boolean = true;
	showNotifications: boolean = false;
	analyticsItems: Link[] = analyticsItems;
	settingsItems: Link[] = settingsItems;

	@State((state) => state.user.isAuthenticated) isAuthenticated!: boolean;
	@Getter('user/accounts') accounts!: string[];

	mounted() {
		this.makeNavigationResponsive(false);
	}

	toggleNavigation(): void {
		this.showNavigation = !this.showNavigation;
	}

	toggleNotifications(): void {
		this.showNotifications = !this.showNotifications;
	}

	makeNavigationResponsive(isUp: boolean): void {
		this.navigationDrawer.permanent = isUp;
	}

	get showLayout() {
		return this.isAuthenticated && this.accounts.length > 0;
	}

	@Watch('myProperty')
	'$vuetify.breakpoint.lgAndUp'(isUp: boolean) {
		this.makeNavigationResponsive(isUp);
	}
}
</script>

<style lang="scss">
@import 'scss/transitions/fade';

.elevate-content {
	z-index: 100 !important;
}
</style>
