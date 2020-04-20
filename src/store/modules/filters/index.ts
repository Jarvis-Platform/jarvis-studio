import moment from 'moment';
import { Module } from 'vuex';
import { FilterState, RootState } from '@/types';

import { getters } from '@/store/modules/filters/getters';
import { actions } from '@/store/modules/filters/actions';
import { mutations } from '@/store/modules/filters/mutations';

export const state: FilterState = {
	accountFilterSelected: {
		account_name: 'All Accounts',
		id: '000000'
	},
	filteredAccounts: [],
	envFilterSelected: {
		label: 'All Env.',
		value: 'ALL'
	},
	envFilters: [
		{ label: 'All Env.', value: 'ALL' },
		{ label: 'Production', value: 'PROD' },
		{ label: 'Pre-Production', value: 'PREPROD' },
		{ label: 'Staging', value: 'STAGING' },
		{ label: 'Development', value: 'DEV' }
	],
	runStatusFilterSelected: {
		label: 'All Status',
		value: 'ALL'
	},
	runStatusFilters: [
		{ label: 'All Status', value: 'ALL' },
		{ label: 'Success', value: 'SUCCESS' },
		{ label: 'Failed', value: 'FAILED' },
		{ label: 'Running', value: 'RUNNING' },
		{ label: 'No Match', value: 'NO_MATCH' },
		{ label: 'Checked', value: 'CHECKED' }
	],
	confActivatedFilterSelected: {
		label: 'All Status',
		value: 'ALL'
	},
	confActivatedFilters: [
		{ label: 'All Status', value: 'ALL' },
		{ label: 'Activated', value: true },
		{ label: 'Disabled', value: false }
	],
	dateFilterSelected: {
		label: 'Last 2 Days',
		value: 1
	},
	dateFilters: [
		{ label: 'Today', value: 0 },
		{ label: 'Last 2 Days', value: 1 },
		{ label: 'Last 7 Days', value: 7 },
		{ label: 'Last 30 Days', value: 31 },
		{ label: 'Last 90 Days', value: 90 }
	],
	minDateFilter: moment()
		.utc()
		.startOf('day')
		.subtract(1, 'days')
		.toISOString()
};

const namespaced: boolean = true;

export const filtersModule: Module<FilterState, RootState> = {
	namespaced,
	state,
	getters,
	actions,
	mutations
};
