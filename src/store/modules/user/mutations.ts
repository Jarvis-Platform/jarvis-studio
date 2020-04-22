import { MutationTree } from 'vuex';
import { UserState } from '@/types';
import firebase from 'firebase';

export const mutations: MutationTree<UserState> = {
	setUser(state, payload) {
		state.user = payload;

		firebase
			.auth()
			.currentUser!.getIdTokenResult()
			.then((idTokenResult) => {
				if (!state.user) return;

				if (idTokenResult.claims == null || idTokenResult.claims.accounts == null) {
					state.user.accounts = [];
				} else {
					state.user.accounts = idTokenResult.claims.accounts;
				}
				if (idTokenResult.claims == null || idTokenResult.claims.studioRoles == null) {
					state.user.studioRoles = 0;
				} else {
					state.user.studioRoles = idTokenResult.claims.studioRoles;
				}
			})
			.catch((error) => {
				console.error(error);
			});
	},
	setIsAuthenticated(state, payload) {
		state.isAuthenticated = payload;
	},
};
