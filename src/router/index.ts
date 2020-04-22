import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import { routes } from './routes';
import { middlewarePipeline } from './middleware/pipeline';
import { Context, Middleware } from '@/types';

Vue.use(Router);

const router = new Router({
	mode: 'history',
	linkActiveClass: 'active',
	routes: routes,
});

router.beforeEach((to, from, next) => {
	if (!to.meta.middleware) return next();

	const context: Context = { to, from, next, store };
	const middleware: Middleware[] = to.meta.middleware;
	const index: number = 0;

	return middleware[index](context, middlewarePipeline(context, middleware, index + 1));
});

export default router;
