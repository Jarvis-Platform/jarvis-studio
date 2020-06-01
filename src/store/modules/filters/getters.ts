import { GetterTree } from 'vuex';
import { Account, DataWorkflowsType, EnvFilter, FilterState, RootState } from '@/types';
import moment from 'moment';
import { RUNS, STATUS } from '@/constants/data-workflows/status';

const getAccountsFilter = (filteredAccounts: Account[], formattedFilteredAccounts: string[], rootState: RootState) => {
	return filteredAccounts.length > 0
		? ['account', 'in', formattedFilteredAccounts]
		: ['account', 'in', rootState.user.user!.accounts];
};

const getEnvFilterSelected = (envFilterSelected: EnvFilter) => {
	return ['environment', '==', envFilterSelected.value];
};

const getMinDateFilter = (minDateFilter: string, type: DataWorkflowsType) => {
	let field = type === RUNS ? 'dag_execution_date' : 'last_modified';
	return minDateFilter ? [field, '>=', minDateFilter] : [field, '>=', '2019-01-01T00:00:00.000Z'];
};

export const getters: GetterTree<FilterState, RootState> = {
	filteredAccounts(state) {
		return state.filteredAccounts;
	},
	periodFiltered(state) {
		//Compute the date array from minDateFilter to Now to build chart
		let periodFiltered = [];
		var i;
		for (i = 0; i <= state.dateFilterSelected.value; i++) {
			periodFiltered.push(
				moment()
					.utc()
					.startOf('day')
					.subtract(state.dateFilterSelected.value - i, 'days')
					.toISOString()
			);
		}
		return periodFiltered;
	},
	whereStatusFilter(state, getters, rootState) {
		const { filteredAccounts, minDateFilter, envFilterSelected } = state;
		const formattedFilteredAccounts = filteredAccounts.map((account) => account.id);

		let filters = [
			getAccountsFilter(filteredAccounts, formattedFilteredAccounts, rootState),
			getMinDateFilter(minDateFilter, STATUS),
		];

		if (envFilterSelected.value !== 'ALL') filters.push(getEnvFilterSelected(envFilterSelected));

		return filters;
	},
	whereRunsFilter(state, getters, rootState) {
		const { filteredAccounts, minDateFilter, envFilterSelected, runStatusFilterSelected } = state;
		const formattedFilteredAccounts = filteredAccounts.map((account) => account.id);

		let filters = [
			getAccountsFilter(filteredAccounts, formattedFilteredAccounts, rootState),
			getMinDateFilter(minDateFilter, RUNS),
		];

		if (envFilterSelected.value !== 'ALL') filters.push(getEnvFilterSelected(envFilterSelected));
		if (runStatusFilterSelected.value !== 'ALL') filters.push(['status', '==', runStatusFilterSelected.value]);

		return filters;
	},
	whereConfFilter(state, getters, rootState) {
		const { filteredAccounts, envFilterSelected, confActivatedFilterSelected } = state;
		const formattedFilteredAccounts = filteredAccounts.map((account) => account.id);

		let filters = [getAccountsFilter(filteredAccounts, formattedFilteredAccounts, rootState)];

		if (envFilterSelected.value !== 'ALL') filters.push(getEnvFilterSelected(envFilterSelected));
		if (confActivatedFilterSelected.value === 'ALL') {
			// @ts-ignore
			filters.push(['archived', '==', false]);
		} else {
			if (confActivatedFilterSelected.label === 'Archived') {
				// @ts-ignore
				filters.push(['archived', '==', confActivatedFilterSelected.value]);
			} else {
				// @ts-ignore
				filters.push(['archived', '==', false]);
				// @ts-ignore
				filters.push(['activated', '==', confActivatedFilterSelected.value]);
			}
		}

		return filters;
	},
};
