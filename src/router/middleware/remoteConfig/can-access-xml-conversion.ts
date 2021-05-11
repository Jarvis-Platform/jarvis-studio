import { Context, Middleware, MiddlewarePipeline } from '@/types';
import { HOME } from '@/constants/router/routes-names';
import { userCanAccessXMLConversion } from '@/remote-config/rules';

export const canAccessXMLConversion: Middleware = (
	{ next, store }: Context,
	nextPipeline: ReturnType<MiddlewarePipeline>
) => {
	if (userCanAccessXMLConversion(store.getters['filters/filteredAccounts'][0].id)) {
		return nextPipeline();
	} else {
		return next({ name: HOME });
	}
};
