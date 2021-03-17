import { Context, Middleware, MiddlewarePipeline } from '@/types';
import { HOME } from '@/constants/router/routes-names';
import { userCanAccessContexts } from '@/remote-config/rules';

export const canAccessContexts: Middleware = (
	{ next, store }: Context,
	nextPipeline: ReturnType<MiddlewarePipeline>
) => {
	if (userCanAccessContexts(store.getters['filters/filteredAccounts'][0].id)) {
		return nextPipeline();
	} else {
		return next({ name: HOME });
	}
};
