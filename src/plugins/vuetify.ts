import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

// This file has to be synchronized with global.scss file

export default new Vuetify({
	iconfont: 'md',
	theme: {
		themes: {
			light: {
				primary: '#03A9F4',
				secondary: '#0287C4',
				complementary: '#F58702',
				error: '#b71c1c',
				menu: '#012738',
				background: '#012F45',
				contrast: '#001A26'
			},
			// TODO: Create dark mode
			dark: {
				primary: '#03A9F4',
				secondary: '#0287C4',
				complementary: '#F58702',
				error: '#b71c1c',
				menu: '#012738',
				background: '#012F45',
				contrast: '#001A26'
			}
		}
	}
});
