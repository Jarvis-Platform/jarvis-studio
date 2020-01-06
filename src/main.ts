import Vue from 'vue';
import vueMoment from 'vue-moment';
import App from './App.vue';
import router from '@/router';
import store from '@/store/index';
import vuetify from '@/plugins/vuetify';
import { firebase } from '@/config/firebase';

Vue.config.productionTip = false;

Vue.use(vueMoment);

let app: Vue;

const createApp = () => {
	if (!app) {
		app = new Vue({
			store,
			router,
			vuetify,
			render: h => h(App)
		}).$mount('#app');
	}
};

firebase.auth().onAuthStateChanged(user => {
	// TODO: Fetch accounts while filtering on account_name from `getUserAccounts`

	if (user) {
		Promise.all([
			store.dispatch('autoSignIn', user),
			store.dispatch('accounts/fetchAndAdd'),
			store.dispatch('schemas/fetchAndAdd')
		]).then(() => createApp());
	} else {
		createApp();
	}
});
