import Vue from 'vue';
import vueMoment from 'vue-moment';
import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import { firebase, initFirebase } from '@/plugins/firebase';
import { TiptapVuetifyPlugin } from 'tiptap-vuetify';
import vueDebounce, { PluginConfig } from 'vue-debounce';
import '@/plugins/vue-gtm';

if (process.env.NODE_ENV !== 'development') {
	Sentry.init({
		dsn: process.env.VUE_APP_SENTRY_DSN,
		environment: process.env.NODE_ENV,
		integrations: [new VueIntegration({ Vue, attachProps: true })],
	});
}

initFirebase().catch((error) => {
	console.error(error);
});

Vue.config.productionTip = false;

Vue.use(vueMoment);
Vue.use(TiptapVuetifyPlugin, {
	vuetify,
	iconsGroup: 'mdi',
});
Vue.use<PluginConfig>(vueDebounce, { lock: true, defaultTime: '400ms', listenTo: 'keyup' });

let app: Vue;

const createApp = () => {
	if (!app) {
		const louAssistScript = document.createElement('script');
		louAssistScript.setAttribute('src', '//run.louassist.com/v2.5.0-m?id=611739999719');
		document.head.appendChild(louAssistScript);

		app = new Vue({
			store,
			router,
			vuetify,
			render: (h) => h(App),
		}).$mount('#app');
	}
};

firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		store.dispatch('user/alreadySignedIn', user).then(() => createApp());
		store.dispatch('accounts/fetchAndAdd');
		store.dispatch('schemas/fetchAndAdd');
	} else {
		createApp();
	}
});
