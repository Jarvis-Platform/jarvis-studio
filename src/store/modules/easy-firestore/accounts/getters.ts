import { GetterTree } from 'vuex';
import { IPluginState } from 'vuex-easy-firestore/types/declarations';
import { RootState } from '@/types';

export const getters: GetterTree<IPluginState, RootState> = {
	getAccounts(state) {
		return state.data;
	},
};
