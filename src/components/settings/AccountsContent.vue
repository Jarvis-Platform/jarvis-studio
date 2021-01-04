<template>
	<v-container fluid>
		<v-toolbar class="elevation-0" color="transparent">
			<v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details />
			<v-spacer />
			<v-btn @click="openMainDialog" color="primary" dark class="mb-2">New Account</v-btn>
		</v-toolbar>

		<v-data-table :headers="headers" :items="accounts" :search="search" class="elevation-1">
			<template v-slot:item.actions="{ item }">
				<v-btn x-small class="mr-2" @click="editAccount(item)">
					<v-icon x-small>mdi-pencil</v-icon>
				</v-btn>

				<v-btn x-small @click="openDeleteDialiog(item)">
					<v-icon x-small>mdi-delete</v-icon>
				</v-btn>
			</template>
		</v-data-table>

		<v-dialog v-model="showMainDialog" width="800px">
			<v-card>
				<v-card-title>Create Account</v-card-title>
				<form>
					<v-container class="pa-4">
						<v-row>
							<v-col cols="6">
								<v-text-field
									v-model="account.id"
									:error-messages="checkId()"
									label="Account Id"
									:disabled="isEditing"
									:counter="6"
									required
									@input="$v.account.id.$touch()"
									@blur="$v.account.id.$touch()"
								/>
							</v-col>
							<v-col cols="6">
								<v-text-field
									v-model="account.account_name"
									:error-messages="getError('account_name')"
									label="Account Name"
									required
									@input="$v.account.account_name.$touch()"
									@blur="$v.account.account_name.$touch()"
								/>
							</v-col>
						</v-row>

						<v-row>
							<v-col cols="6">
								<v-text-field
									v-model="account.exc_gcp_id_project"
									label="GCP Project ID for the Exc project"
									@input="$v.account.exc_gcp_id_project.$touch()"
									@blur="$v.account.exc_gcp_id_project.$touch()"
								/>
							</v-col>
							<v-col cols="6">
								<v-text-field
									v-model="account.dlk_gcp_id_project"
									label="GCP Project ID for the Dlk project"
									@input="$v.account.dlk_gcp_id_project.$touch()"
									@blur="$v.account.dlk_gcp_id_project.$touch()"
								/>
							</v-col>
							<v-col cols="12">
								<v-text-field
									v-model="account.sct_gcp_id_project"
									label="GCP Project ID for the Sanctuary project"
									@input="$v.account.sct_gcp_id_project.$touch()"
									@blur="$v.account.sct_gcp_id_project.$touch()"
								/>
							</v-col>
						</v-row>

						<v-row>
							<v-col cols="6">
								<v-text-field
									v-model="account.contact_first_name"
									label="First Name of the main account contact"
									@input="$v.account.contact_first_name.$touch()"
									@blur="$v.account.contact_first_name.$touch()"
								/>
							</v-col>
							<v-col cols="6">
								<v-text-field
									v-model="account.contact_last_name"
									label="Last Name of the main account contact"
									@input="$v.account.contact_last_name.$touch()"
									@blur="$v.account.contact_last_name.$touch()"
								/>
							</v-col>
							<v-col cols="12">
								<v-text-field
									v-model="account.contact_email"
									label="Email of the main account contact"
									@input="$v.account.contact_email.$touch()"
									@blur="$v.account.contact_email.$touch()"
								/>
							</v-col>
						</v-row>

						<v-row>
							<v-col cols="12">
								<v-textarea
									v-model="account.note"
									label="Note"
									@input="$v.account.note.$touch()"
									@blur="$v.account.note.$touch()"
								/>
							</v-col>
						</v-row>
					</v-container>
				</form>

				<v-card-actions>
					<v-spacer />
					<v-btn text @click="hideMainDialog">Cancel</v-btn>
					<v-btn text class="mr-4" @click="submit">Submit</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<v-dialog v-model="showDeleteDialog" max-width="290">
			<v-card>
				<v-card-title class="headline">Warning</v-card-title>
				<v-card-text> Are you sure you want to delete {{ account.account_name }} ({{ account.id }})? </v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="green darken-1" text @click="showDeleteDialog = false">Cancel</v-btn>
					<v-btn color="green darken-1" text @click="deleteAccount">Delete</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import { validationMixin } from 'vuelidate';
import { required, maxLength, minLength, numeric } from 'vuelidate/lib/validators';
import { accounts } from '@/store/modules/easy-firestore/accounts';

interface Account {
	id: string;
	account_name: string;
	exc_gcp_id_project: string;
	dlk_gcp_id_project: string;
	sct_gcp_id_project: string;
	contact_first_name: string;
	contact_last_name: string;
	contact_email: string;
	note: string;
}

@Component({
	components: { VueJsonPretty },
	mixins: [validationMixin],
	validations: {
		account: {
			id: { required, minLength: minLength(6), maxLength: maxLength(6), numeric },
			account_name: { required },
			exc_gcp_id_project: {},
			dlk_gcp_id_project: {},
			sct_gcp_id_project: {},
			contact_first_name: {},
			contact_last_name: {},
			contact_email: {},
			note: {},
		},
	},
})
export default class AccountsContent extends Vue {
	@State((state) => Object.values(state.accounts.data)) accounts!: Account[];

	search = '';
	showMainDialog = false;
	showDeleteDialog = false;
	isEditing = false;
	account: Account = this.defaultAccount;

	checkId() {
		const errors: string[] = [];
		if (!this.$v.account.id?.$dirty) return errors;
		!this.$v.account.id?.required && errors.push('ID is required.');
		!this.$v.account.id?.minLength && errors.push('ID must be 6 digits long');
		!this.$v.account.id?.maxLength && errors.push('ID must be 6 digits long');
		!this.$v.account.id?.numeric && errors.push('ID must be only numerical');

		if (this.accounts.filter((account) => account.id === this.account.id).length > 0)
			errors.push('ID is already taken');
		return errors;
	}

	getError(key: string) {
		const errors: string[] = [];
		if (!this.$v.account[key]?.$dirty) return errors;
		!this.$v.account[key]?.required && errors.push(`${key} is required.`);
		return errors;
	}

	openMainDialog() {
		this.account = this.defaultAccount;
		this.isEditing = false;
		this.showMainDialog = true;
	}

	openDeleteDialiog(account: Account) {
		this.account = account;
		this.showDeleteDialog = true;
	}

	hideMainDialog() {
		this.showMainDialog = false;
		this.$v.$reset();
	}

	submit() {
		this.$v.$touch();
		if (this.$v.$invalid) return;
		this.$store.dispatch(`${accounts.moduleName}/set`, this.account).then(() => {
			this.hideMainDialog();
		});
	}

	editAccount(account: Account) {
		this.isEditing = true;
		this.account = account;
		this.showMainDialog = true;
	}

	deleteAccount() {
		this.$store
			.dispatch(`${accounts.moduleName}/delete`, this.account.id)
			.then(() => {
				this.showDeleteDialog = false;
			})
			.catch((err) => {
				console.log(err);
				this.showDeleteDialog = false;
			});
	}

	get headers() {
		return [
			{
				text: 'Account ID',
				align: 'left',
				sortable: true,
				value: 'id',
			},
			{
				text: 'Account Name',
				align: 'left',
				sortable: true,
				value: 'account_name',
			},
			{
				text: 'Contact Email',
				align: 'left',
				sortable: true,
				value: 'contact_email',
			},
			{
				text: 'Dlk Project ID',
				align: 'left',
				sortable: true,
				value: 'dlk_gcp_id_project',
			},
			{
				text: 'Updated At',
				align: 'left',
				sortable: true,
				value: 'updated_at',
			},
			{
				text: 'Actions',
				sortable: false,
				value: 'actions',
			},
		];
	}

	get defaultAccount(): Account {
		return {
			id: '',
			account_name: '',
			exc_gcp_id_project: '',
			dlk_gcp_id_project: '',
			sct_gcp_id_project: '',
			contact_first_name: '',
			contact_last_name: '',
			contact_email: '',
			note: '',
		};
	}
}
</script>
