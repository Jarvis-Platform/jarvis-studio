import { RouteConfig } from 'vue-router';

import { auth, guest } from '@/router/middleware';
import { LOGOUT, RESET_PASSWORD, SIGN_IN } from '@/constants/router/routes-names';

export const authRoutes: RouteConfig[] = [
	{
		path: '/sign-in',
		name: SIGN_IN,
		meta: { middleware: [guest] },
		component: () => import(/* webpackChunkName: "auth/sign-in" */ '@/views/auth/SignIn.vue'),
	},
	{
		path: '/reset-password',
		name: RESET_PASSWORD,
		meta: { middleware: [guest] },
		component: () => import(/* webpackChunkName: "auth/reset-password" */ '@/views/auth/ResetPassword.vue'),
	},
	{
		path: '/logout',
		name: LOGOUT,
		meta: { middleware: [auth] },
		component: () => import(/* webpackChunkName: "auth/sign-in" */ '@/views/auth/Logout.vue'),
	},
];
