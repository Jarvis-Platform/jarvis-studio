<template>
	<v-col>
		<v-progress-linear v-if="isLoading" color="complementary" indeterminate />

		<v-treeview
			v-else
			:items="models"
			:open.sync="open"
			:active.sync="active"
			active-class="primary--text"
			class="transparent"
			open-on-click
			transition
			activatable
		>
			<template v-slot:label="{ item, active }">
				<v-icon v-if="!item.children" :color="active ? 'primary' : 'white'">table_chart</v-icon>
				{{ item.name }}
			</template>
		</v-treeview>
	</v-col>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { TABLES_LISTING } from '@/constants/router/routes-names';
import { mapState } from 'vuex';
import { Getter, State } from 'vuex-class';
import { Account, AccountId } from '@/types';

interface TreeItem {
	id: string;
	name: string;
	children?: TreeItem[];
}

@Component({
	computed: {
		...mapState({
			dataModels: (state: any) => state.dataModels.data,
		}),
	},
})
export default class TreeView extends Vue {
	@State((state) => state.accounts.data) accounts!: Account[];
	@Getter('user/accounts') userAccounts!: AccountId[];
	@Getter('filters/filteredAccounts') filteredAccounts!: Account[];

	private dataModels: any;

	active: string[] = [];
	lastActivated: string = '';
	open: string[] = [];
	models: TreeItem[] = [];
	isLoading: boolean = true;

	@Watch('active')
	onActiveChange(value: string[]) {
		if (!value.length) {
			this.active = [this.lastActivated];
			return;
		}

		const id = value[0];
		this.lastActivated = id;
		this.$router
			.push({
				name: TABLES_LISTING,
				params: { projectId: id.split('/')[0], datasetId: id.split('/')[1] },
			})
			.catch((err) => {});
	}

	@Watch('filteredAccounts')
	onFilteredAccountsChange() {
		this.getDataModel();
	}

	mounted() {
		this.$store
			.dispatch('dataModels/fetchAndAdd', {
				where: [['account', '==', JSON.parse(localStorage.vuex).filters.filteredAccounts[0].id]],
				limit: 0,
			})
			.then(() => this.getDataModel());
	}

	beforeDestroy() {
		this.$store.dispatch('dataModels/closeDBChannel', { clearModule: true });
	}

	getDataModel() {
		const dataModels = Object.values(this.dataModels);

		this.models = dataModels.map(
			(data: any): TreeItem => {
				let children: TreeItem[] = [];

				data.sub_collections.forEach((dataset: string) =>
					children.push({ id: `${data.id}/${dataset}`, name: dataset })
				);

				return { id: data.id, name: data.id, children };
			}
		);

		this.isLoading = false;
	}

	get formattedUserAccounts() {
		let accounts: object = {};

		const callback = (id: string) => {
			const element = this.accounts[id];
			if (element) accounts[element.dlk_gcp_id_project] = element;
		};

		this.filteredAccounts.length > 0
			? this.filteredAccounts.forEach(({ id }: Account) => callback(id))
			: this.userAccounts.forEach((id) => callback(id));

		return accounts;
	}
}
</script>
