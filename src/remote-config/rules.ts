import Vue from 'vue';
export const userCanAccessContexts = (accountId: string) => {
	const remoteConfigValue = Vue.prototype.$remoteConfig.getValue('showContexts')._value;
	return remoteConfigValue ? JSON.parse(Vue.prototype.$remoteConfig.getValue('showContexts')._value)[accountId] : false;
};
