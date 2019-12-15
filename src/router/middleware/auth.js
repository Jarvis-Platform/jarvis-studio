import { SIGN_IN } from '@/constants/router/routes-names';

export default function auth({ next, store }) {
	if (!store.getters.isAuthenticated) {
		return next({ name: SIGN_IN });
	}

	return next();
}