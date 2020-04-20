import { Context, Middleware, MiddlewarePipeline } from '@/types';
import { SIGN_IN } from '@/constants/router/routes-names';

export const auth: Middleware = ({ to, next, store }: Context, nextPipeline: ReturnType<MiddlewarePipeline>) => {
	if (!store.getters['user/isAuthenticated']) {
		return next({ name: SIGN_IN, query: { redirect: to.path } });
	}
	return nextPipeline();
};
