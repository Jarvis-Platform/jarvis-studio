<template>
	<div class="accounts-selector d-flex justify-center align-center">
		<v-select
			v-model="selectedAccounts"
			:items="getAccounts()"
			item-text="account_name"
			label="Select an account"
			no-data-text="No accounts available"
			return-object
			hide-details
			class="selector"
		/>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter, State } from 'vuex-class';
import { Account, AccountId, User } from '@/types';

@Component
export default class AccountSelector extends Vue {
	@State((state) => state.accounts.data) accounts!: Account[];
	@State((state) => state.user.user) user!: User;

	@Getter('user/accounts') userAccounts!: AccountId[];

	@Watch('selectedAccounts')
	onSelectedAccountChange(accounts: Account) {
		this.$store.dispatch('filters/updateFilteredAccounts', [accounts]);
	}

	isLoading: boolean = true;
	selectedAccounts: string = JSON.parse(localStorage.vuex).filters.filteredAccounts;

	getAccounts() {
		let accounts: AccountId[] = [];

		this.userAccounts.forEach((id) => {
			const element = this.accounts[id];
			if (element) accounts.push(element);
		});

		return accounts;
	}
}
</script>

<style lang="scss">
.accounts-selector {
	width: 100vw;
	height: 100vh;

	.selector {
		max-width: 260px;
	}

	.other-accounts {
		margin-left: 0.5em;
	}
}
</style>
