import { ActionTree } from 'vuex';
import { FilterState, RootState } from '@/types';

export const actions: ActionTree<FilterState, RootState> = {
	applyDateFilterSelected({ commit }, dateFilterSelected) {
		//Propagate the DateFilterSelected to the store
		commit('updateDateFilterSelected', dateFilterSelected);
		//Compute the minDate to apply from the DateFilterSelected
		commit('updateMinDateFilter', dateFilterSelected);
	},
	updateFilteredAccounts({ commit }, accountFilterSelected) {
		commit('updateAccountFilterSelected', accountFilterSelected);
	},
	applyEnvFilterSelected({ commit }, envFilterSelected) {
		commit('updateEnvFilterSelected', envFilterSelected);
	},
	applyRunStatusFilterSelected({ commit }, runStatusFilterSelected) {
		commit('updateRunStatusFilterSelected', runStatusFilterSelected);
	},
	applyConfActivatedFilterSelected({ commit }, confActivatedFilterSelected) {
		commit('updateConfActivatedFilterSelected', confActivatedFilterSelected);
	},
};
