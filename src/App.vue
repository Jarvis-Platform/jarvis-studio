<template>
	<v-app>
		<template v-if="showLayout">
			<account-selector v-if="$store.getters['filters/filteredAccounts'].length === 0" />

			<template v-else>
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
					<navigation-content :drawer="navigationDrawer" />
				</v-navigation-drawer>

				<!-- <v-navigation-drawer v-model="showNotifications" fixed app temporary right>
					<notification-content @closeNotifications="toggleNotifications" />
				</v-navigation-drawer> -->

				<v-main>
					<transition name="fade" mode="out-in">
						<keep-alive>
							<router-view :key="routeKey" />
						</keep-alive>
					</transition>
				</v-main>

				<v-footer class="elevate-content menu" app dark>
					<footer-content />
				</v-footer>
			</template>
		</template>

		<v-main v-else>
			<transition name="fade" mode="out-in">
				<keep-alive>
					<router-view :key="routeKey" />
				</keep-alive>
			</transition>
		</v-main>
	</v-app>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import { User } from '@/types';
import AccountSelector from '@/components/app/AccountsSelector.vue';
import AppBar from '@/components/app/app-bar/AppBar.vue';
import NavigationContent from '@/components/app/NavigationContent.vue';
import NotificationContent from '@/components/app/NotificationContent.vue';
import FooterContent from '@/components/app/FooterContent.vue';

import { State, Getter } from 'vuex-class';

interface Drawer {
	permanent: boolean;
	mini: boolean;
}

@Component({
	components: { AccountSelector, AppBar, FooterContent, NavigationContent, NotificationContent },
})
export default class App extends Vue {
	navigationDrawer: Drawer = { permanent: true, mini: false };
	showNavigation: boolean = true;
	showNotifications: boolean = false;

	@State((state) => state.user.isAuthenticated) isAuthenticated!: boolean;
	@Getter('user/accounts') accounts!: string[];
	@Getter('user/user') user!: User;

	mounted() {
		this.makeNavigationResponsive(false);

		console.log('test');

		if (process.env.NODE_ENV === 'production') {
			window.onload = () =>
				window.LOU.identify(this.user.email, {
					plan: 'standard',
					company: JSON.parse(localStorage.vuex).filters.filteredAccounts[0],
					name: this.user.displayName,
					role: this.user.studioRoles,
				});
		}
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

	get routeKey() {
		const currentAccount = this.$store.getters['filters/filteredAccounts'][0];
		return currentAccount
			? `${this.$store.getters['filters/filteredAccounts'][0].id}${this.$route.fullPath}`
			: this.$route.fullPath;
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
