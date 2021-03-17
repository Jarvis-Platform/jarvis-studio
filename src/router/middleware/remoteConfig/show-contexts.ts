import Vue from 'vue';
import { Context, Middleware, MiddlewarePipeline } from '@/types';
import { HOME } from '@/constants/router/routes-names';

export const canAccessContexts: Middleware = (
	{ next, store }: Context,
	nextPipeline: ReturnType<MiddlewarePipeline>
) => {
	if (
		JSON.parse(Vue.prototype.$remoteConfig.getValue('showContexts')._value)[
			store.getters['filters/filteredAccounts'][0].id
		]
	) {
		return nextPipeline();
	} else {
		return next({ name: HOME });
	}
};
