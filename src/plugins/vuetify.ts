import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

// This file has to be synchronized with global.scss file

export default new Vuetify({
	iconfont: 'md',
	theme: {
		themes: {
			light: {
				primary: '#8377B4',
				secondary: '#009BB9',
				complementary: '#8377B4',
				error: '#b71c1c',
				menu: '#555578',
				submenu: '#F7F7F7',
				activemenu: '#74C4AA',
				background: '#4A4A67',
				contrast: '#001A26',
			},
			// TODO: Create dark mode
			dark: {
				primary: '#03A9F4',
				secondary: '#0287C4',
				complementary: '#F58702',
				error: '#b71c1c',
				menu: '#555578',
				submenu: '#F7F7F7',
				activemenu: '#74C4AA',
				background: '#012F45',
				contrast: '#001A26',
			},
		},
	},
});
