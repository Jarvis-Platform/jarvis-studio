import { Module } from 'vuex';
import { RootState, UserState } from '@/types';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

export const state: UserState = {
	user: null,
	isAuthenticated: false,
};

const namespaced: boolean = true;

export const userModule: Module<UserState, RootState> = {
	namespaced,
	state,
	getters,
	actions,
	mutations,
};
