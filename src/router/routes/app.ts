import { RouteConfig } from 'vue-router';

import { auth, hasAccount } from '@/router/middleware';
import { HOME, NO_ACCOUNT, NOT_FOUND } from '@/constants/router/routes-names';

export const appRoutes: RouteConfig[] = [
	{
		path: '/',
		name: HOME,
		meta: { middleware: [auth, hasAccount] },
		component: () => import(/* webpackChunkName: "app/home" */ '@/views/app/Home.vue'),
	},
	{
		path: '/no-account',
		name: NO_ACCOUNT,
		meta: { middleware: [auth] },
		component: () => import(/* webpackChunkName: "app/home" */ '@/views/app/NoAccount.vue'),
	},
	{
		path: '*',
		name: NOT_FOUND,
		meta: { middleware: [auth, hasAccount] },
		component: () => import(/* webpackChunkName: "app/home" */ '@/views/app/NotFound.vue'),
	},
];
