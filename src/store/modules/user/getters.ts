import { GetterTree } from 'vuex';
import { RootState, UserState } from '@/types';
import { SUPER_ADMIN } from '@/constants/user/roles';

export const getters: GetterTree<UserState, RootState> = {
	isAuthenticated(state) {
		return state.isAuthenticated;
	},
	user(state) {
		return state.user;
	},
	accounts(state) {
		return state.user!.accounts;
	},
	role(state) {
		return state.user?.studioRoles;
	},
	isSuperAdmin(state) {
		return state.user!.studioRoles === SUPER_ADMIN.roleCode;
	},
};
