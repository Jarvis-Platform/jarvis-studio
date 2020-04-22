<template>
	<v-container>
		<v-data-table :headers="headers" :items="accounts" class="elevation-1">
			<template v-slot:items="props">
				<td>{{ props.item['account_name'] }}</td>
				<td>{{ props.item['id'] }}</td>
				<td>{{ props.item['dlk_gcp_id_project'] }}</td>
				<td>{{ props.item['exc_gcp_id_project'] }}</td>
			</template>
		</v-data-table>

		<v-row>
			<v-col cols="12" offset="0">
				<v-card dark>
					<v-card-text>
						<vue-json-pretty
							:data="accounts"
							:deep="2"
							:show-double-quotes="true"
							:show-length="true"
							:show-line="false"
						>
						</vue-json-pretty>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>

		<v-btn fab bottom right color="blue" dark fixed @click="dialog = !dialog">
			<v-icon>add</v-icon>
		</v-btn>

		<v-dialog v-model="dialog" width="800px">
			<v-card>
				<v-card-title class="black lighten-4 py-4 title">Create Account</v-card-title>
				<v-container class="pa-4">
					<v-row>
						<v-col cols="6">
							<v-text-field prepend-icon="business" placeholder="Account Name" />
						</v-col>
						<v-col cols="6">
							<v-text-field prepend-icon="vpn_key" placeholder="Account ID" />
						</v-col>
						<v-col cols="6">
							<v-text-field prepend-icon="account_box" placeholder="Contact First Name" />
						</v-col>
						<v-col cols="6">
							<v-text-field placeholder="Contact Last Name" />
						</v-col>
						<v-col cols="12">
							<v-text-field prepend-icon="mail" placeholder="Email Contact Account" />
						</v-col>
						<v-col cols="12">
							<v-text-field prepend-icon="notes" placeholder="Notes" />
						</v-col>
					</v-row>
				</v-container>

				<!-- TODO: Add behavior -->
				<v-card-actions>
					<v-btn text color="primary">More</v-btn>
					<v-spacer />
					<v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
					<v-btn text @click="dialog = false">Save</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VueJsonPretty from 'vue-json-pretty';

@Component({
	components: { VueJsonPretty },
})
export default class AccountsContent extends Vue {
	dialog: boolean = false;

	get headers() {
		return [
			{
				text: 'Account Name',
				align: 'left',
				sortable: true,
				value: 'account_name',
			},
			{
				text: 'Account ID',
				align: 'left',
				sortable: true,
				value: 'id',
			},
			{
				text: 'Dlk Project ID',
				align: 'left',
				sortable: true,
				value: 'dlk_gcp_id_project',
			},
			{
				text: 'Exchange Project ID',
				align: 'left',
				sortable: true,
				value: 'exc_gcp_id_project',
			},
		];
	}

	get accounts() {
		return Object.values(this.$store.state.accounts.data);
	}
}
</script>
