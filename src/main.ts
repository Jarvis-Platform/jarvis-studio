import Vue from 'vue';
import vueMoment from 'vue-moment';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import { firebase } from '@/config/firebase';
import { TiptapVuetifyPlugin } from 'tiptap-vuetify';
import vueDebounce, { PluginConfig } from 'vue-debounce';

Vue.config.productionTip = false;

Vue.use(vueMoment);
Vue.use(TiptapVuetifyPlugin, {
	vuetify,
	iconsGroup: 'mdi'
});
Vue.use<PluginConfig>(vueDebounce, { lock: true, defaultTime: '400ms', listenTo: 'keyup' });

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
	if (user) {
		store.dispatch('user/alreadySignedIn', user).then(() => createApp());
		store.dispatch('accounts/fetchAndAdd');
		store.dispatch('schemas/fetchAndAdd');
	} else {
		createApp();
	}
});
