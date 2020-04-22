<template>
	<div class="accounts-selector-wrapper">
		<v-autocomplete
			v-model="selectedAccounts"
			:items="getAccounts()"
			item-text="account_name"
			return-object
			:label="selectedAccounts.length === 0 ? 'All Accounts' : 'Accounts'"
			no-data-text="No accounts available"
			hide-details
			small-chips
			multiple
			chips
		>
			<template v-slot:selection="{ index, item }">
				<span v-if="index === 0">{{ item.account_name }}</span>
				<span v-if="index === 1" class="other-accounts caption">(+{{ selectedAccounts.length - 1 }} others)</span>
			</template>
		</v-autocomplete>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter, State } from 'vuex-class';
import { Account, AccountId, User } from '@/types';

@Component
export default class AccountSelector extends Vue {
	@State(state => state.accounts.data) accounts!: Account[];
	@State(state => state.user.user) user!: User;

	@Getter('user/accounts') userAccounts!: AccountId[];

	@Watch('selectedAccounts')
	onSelectedAccountChange(accounts: Account) {
		this.$store.dispatch('filters/updateFilteredAccounts', accounts);
	}

	isLoading: boolean = true;
	selectedAccounts: string = JSON.parse(localStorage.vuex).filters.filteredAccounts;

	getAccounts() {
		let accounts: AccountId[] = [];

		this.userAccounts.forEach(id => {
			const element = this.accounts[id];
			if (element) accounts.push(element);
		});

		return accounts;
	}
}
</script>

<style lang="scss">
.accounts-selector-wrapper {
	max-width: 260px;

	.other-accounts {
		margin-left: 0.5em;
	}
}
</style>
