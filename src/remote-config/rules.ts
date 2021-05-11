import Vue from 'vue';

const checkRemoteConfigValue = (key: string, accountId: string) => {
	const remoteConfigValue = Vue.prototype.$remoteConfig.getValue(key)._value;
	return remoteConfigValue ? JSON.parse(remoteConfigValue)[accountId] : false;
};

export const userCanAccessContexts = (accountId: string) => {
	return checkRemoteConfigValue('showContexts', accountId);
};

export const userCanAccessXMLConversion = (accountId: string) => {
	return checkRemoteConfigValue('showWMLConversion', accountId);
};
