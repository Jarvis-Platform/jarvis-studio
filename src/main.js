import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/store/index';
import vuetify from './plugins/vuetify';
import firebase from 'firebase';

Vue.config.productionTip = false;

let app = null;

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
	if (user) {
		store.dispatch('autoSignIn', user).then(() => createApp());
		store.dispatch('schemas/fetchAndAdd', { limit: 0 });
	} else {
		createApp();
	}
});
