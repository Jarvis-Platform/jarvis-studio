<template>
	<v-container fluid>
		<v-toolbar class="elevation-0" color="transparent">
			<v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details />

			<v-spacer />

			<v-dialog v-model="showFormDialog" max-width="700px">
				<template v-slot:activator="{ on }">
					<v-btn @click="resetCurrentUser" color="primary" dark class="mb-2" v-on="on">New User</v-btn>
				</template>

				<v-card>
					<v-card-title class="headline">{{ formTitle }}</v-card-title>

					<v-card-text>
						<v-container>
							<v-row v-if="isEditing && (isUserDisabled || !isUserEmailVerified)">
								<v-col cols="12">
									<v-alert v-if="isUserDisabled" type="warning">
										{{ currentUser.displayName }} has been disabled.
									</v-alert>
									<v-alert v-if="!isUserEmailVerified" type="warning">
										{{ currentUser.displayName }} doesn't verified his email address.
									</v-alert>
								</v-col>
							</v-row>

							<v-row>
								<v-col cols="12">
									<v-text-field v-model="currentUser.email" label="Email" :disabled="isUserDisabled" />
								</v-col>
							</v-row>

							<v-row>
								<v-col cols="6">
									<v-text-field v-model="currentUser.displayName" label="Display Name" :disabled="isUserDisabled" />
								</v-col>

								<v-col cols="6">
									<v-text-field
										v-model="currentUser.password"
										:append-icon="showPassword ? 'visibility' : 'visibility_off'"
										:type="showPassword ? 'text' : 'password'"
										name="password"
										label="Password"
										hint="At least 8 characters"
										counter
										@click:append="showPassword = !showPassword"
									/>
								</v-col>
							</v-row>

							<v-row>
								<v-col cols="6">
									<v-select
										v-model="selectedAccounts"
										:items="accountsFormatted"
										label="Accounts"
										multiple
										chips
										hint="Select the accounts to add to the user"
										persistent-hint
										item-text="account_name"
										item-value="id"
									/>
								</v-col>

								<v-col cols="6">
									<v-select
										v-model="selectedStudioRoles"
										:items="studioRoles"
										label="Role"
										single-line
										hint="Select the role to add to the user"
										persistent-hint
										item-key="roleName"
										item-text="roleName"
										item-value="roleCode"
									/>
								</v-col>
							</v-row>
						</v-container>
					</v-card-text>

					<v-card-actions>
						<v-spacer />

						<v-btn color="blue darken-1" text @click="closeFormDialog">Cancel</v-btn>
						<v-btn v-if="isEditing" color="primary" @click="updateUser">Update User</v-btn>
						<v-btn v-else color="primary" @click="createUser">Create User</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>

			<v-progress-circular v-if="isLoading" indeterminate size="20" color="primary" class="ml-2 mr-1" />
			<v-icon v-else right @click="listAllUsers">refresh</v-icon>
		</v-toolbar>

		<v-data-table
			:headers="headers"
			:items="users"
			class="elevation-1"
			:search="search"
			:loading="isLoading"
			:sort-by.sync="pagination.sortBy"
			:sort-desc.sync="pagination.sortDesc"
			item-key="key"
			light
		>
			<template v-slot:item="{ item }">
				<tr :class="{ 'grey--text lighten-4': item.disabled }">
					<td v-if="item.disabled">
						{{ item.email }} <v-chip small disabled color="grey lighten-2" class="ml-2">Disabled</v-chip>
					</td>
					<td v-else>{{ item.email }}</td>
					<td>{{ item.displayName }}</td>
					<td>{{ item.emailVerified }}</td>
					<td>{{ item.disabled }}</td>
					<td>{{ item.nb_accounts }}</td>
					<td>{{ item.studioRolesIndex }}</td>
					<td>
						<v-tooltip top>
							<template v-slot:activator="{ on }">
								<v-icon v-on="on" small class="mr-2" @click="editUser(item)">edit</v-icon>
							</template>
							<span>Edit user</span>
						</v-tooltip>

						<v-tooltip top>
							<template v-slot:activator="{ on }">
								<v-icon v-on="on" small class="mr-2" @click="archiveUser(item)">
									{{ item.disabled ? mdiPackageUp : mdiPackageDown }}
								</v-icon>
							</template>
							<span>{{ item.disabled ? 'Enable' : 'Disable' }} user</span>
						</v-tooltip>

						<v-tooltip top>
							<template v-slot:activator="{ on }">
								<v-icon v-on="on" small @click="showDeleteDialog(item)">delete</v-icon>
							</template>
							<span>Delete user</span>
						</v-tooltip>
					</td>
				</tr>
			</template>
		</v-data-table>

		<v-dialog v-model="showConfirmationDialog" max-width="700">
			<v-card>
				<v-card-title class="headline">Warning</v-card-title>
				<v-card-text>
					<p>
						Are you sure you want to delete <span class="font-weight-bold">{{ this.currentUser.displayName }}</span> ?
					</p>
				</v-card-text>
				<v-card-actions>
					<v-spacer />
					<v-btn text @click="showConfirmationDialog = false">Close</v-btn>
					<v-btn text @click="deleteUser">Delete</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<v-snackbar v-model="snackbar.isVisible" :color="snackbar.color" :timeout="3500">
			{{ snackbar.text }}
			<v-btn text @click="snackbar.isVisible = false">Close</v-btn>
		</v-snackbar>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { AnyObject, FirestoreAccount, Role, Snackbar, User } from '@/types';
import { DataTableHeader } from 'vuetify';
import firebase from 'firebase';
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
import merge from 'lodash.merge';
import { users } from '@/store/modules/easy-firestore/users';
import { SNACKBAR } from '@/constants/ui/snackbar';
import { ADMIN, MEMBER, SUPER_ADMIN, USER, VIEWER, WRITER } from '@/constants/user/roles';
import { mdiPackageDown, mdiPackageUp } from '@mdi/js';

// TODO: Split component

@Component({
	computed: {
		...mapState({ accounts: (state: any) => state.accounts.data }),
		...mapGetters(['periodFiltered', 'filters/whereConfFilter']),
	},
})
export default class UsersContent extends Vue {
	mdiPackageDown: string = mdiPackageDown;
	mdiPackageUp: string = mdiPackageUp;
	accounts: any;
	selectedAccounts: string[] = [];
	users: AnyObject[] = [];
	currentUser: AnyObject = {
		email: '',
		customClaims: {},
		displayName: '',
		emailVerified: false,
		disabled: false,
		creationTime: Date.now(),
		password: '',
	};
	selectedStudioRoles: number = 0;
	studioRoles: Role[] = [MEMBER, VIEWER, USER, WRITER, ADMIN, SUPER_ADMIN];
	showFormDialog: boolean = false;
	showConfirmationDialog: boolean = false;
	snackbar: Snackbar = { isVisible: false, timeout: SNACKBAR.TIMEOUT, text: '', color: 'complementary' };
	pagination = { sortBy: 'email', sortDesc: false }; // TODO: type
	showPassword: boolean = false;
	isEditing: boolean = false;
	search: string = '';
	isLoading: boolean = false;

	mounted() {
		this.listAllUsers();
	}

	resetCurrentUser() {
		this.isEditing = false;
		this.currentUser = {};
		this.selectedAccounts = [];
		this.selectedStudioRoles = 0;
	}

	listAllUsers() {
		this.isLoading = true;

		this.$httpsCallableFunction('listUsers', {})
			.then((res) => {
				const dataUsers = Object.values(res.data.users);

				let usersFormatted = res.data.users.map(function (user: User) {
					let nb_accounts = 0;
					try {
						nb_accounts = user.customClaims.accounts.length;
					} catch (error) {
						nb_accounts = 0;
					}
					let studioRolesIndex = 0;
					try {
						studioRolesIndex = user.customClaims.studioRoles;
					} catch (error) {
						studioRolesIndex = 0;
					}
					return {
						nb_accounts: nb_accounts,
						studioRolesIndex: studioRolesIndex,
					};
				});

				this.users = merge(dataUsers, usersFormatted);
				this.isLoading = false;
			})
			.catch(() => {
				this.isLoading = false;
			});
	}

	dispatchUser(action: 'set' | 'patch', data: AnyObject) {
		if (!data.id) throw new Error('Id must be provided to save user information');
		this.$store.dispatch(`${users.moduleName}/${action}`, data);
	}

	createUser() {
		const photoURL = 'https://raw.githubusercontent.com/mkfeuhrer/JarvisBot/master/images/JarvisBot.gif';
		this.closeFormDialog();
		this.isLoading = true;

		this.$httpsCallableFunction('createUser', {
			email: this.currentUser.email,
			displayName: this.currentUser.displayName,
			emailVerified: this.currentUser.emailVerified,
			photoURL,
			password: this.currentUser.password,
			disabled: this.currentUser.disabled,
			accounts: this.selectedAccounts,
			studioRoles: this.selectedStudioRoles,
		}).then((res) => {
			this.listAllUsers();
			this.showSnackbar('User has been created.', 'success');

			this.dispatchUser('set', {
				id: res.data.data.uid,
				disabled: false,
				deleted: false,
				displayName: this.currentUser.displayName,
				email: this.currentUser.email,
				photoURL,
			});
		});
	}

	editUser(user: User) {
		this.isEditing = true;
		this.currentUser = user;
		if (
			this.currentUser.customClaims == null ||
			typeof this.currentUser.customClaims.accounts === 'undefined' ||
			this.currentUser.customClaims.accounts === null
		) {
			this.selectedAccounts = [];
		} else {
			this.selectedAccounts = this.currentUser.customClaims.accounts;
		}
		if (
			this.currentUser.customClaims == null ||
			typeof this.currentUser.customClaims.studioRoles === 'undefined' ||
			this.currentUser.customClaims.studioRoles === null
		) {
			this.selectedStudioRoles = 0;
		} else {
			this.selectedStudioRoles = this.currentUser.customClaims.studioRoles;
		}
		this.showFormDialog = true;
	}

	updateUser() {
		this.isLoading = true;
		this.closeFormDialog();

		this.$httpsCallableFunction('updateUser', {
			accounts: this.selectedAccounts,
			email: this.currentUser.email,
			displayName: this.currentUser.displayName,
			photoURL: this.currentUser.photoURL,
			studioRoles: this.selectedStudioRoles,
		}).then(() => {
			this.isLoading = false;
			this.showSnackbar('User has been updated.', 'success');

			this.dispatchUser('patch', {
				id: this.currentUser.uid,
				displayName: this.currentUser.displayName,
				email: this.currentUser.email,
			});
		});
	}

	archiveUser(user: User) {
		this.isLoading = true;
		this.currentUser = user;

		this.$httpsCallableFunction('updateUser', {
			email: user.email,
			disabled: !user.disabled,
		}).then(() => {
			const index = this.users.indexOf(user);
			const disabledValue = !user.disabled;
			this.users[index].disabled = disabledValue;

			this.isLoading = false;
			this.showSnackbar(`User has been ${this.currentUser.disabled ? 'disabled' : 'enabled'}.`, 'success');

			this.dispatchUser('patch', {
				id: this.currentUser.uid,
				disabled: disabledValue,
			});
		});
	}

	showDeleteDialog(user: User) {
		this.currentUser = user;
		this.showConfirmationDialog = true;
	}

	deleteUser() {
		const index = this.users.indexOf(this.currentUser);

		this.isLoading = true;
		this.showConfirmationDialog = false;

		this.$httpsCallableFunction('deleteUser', { email: this.currentUser.email }).then(() => {
			this.users.splice(index, 1);
			this.isLoading = false;
			this.showSnackbar('User has been deleted', 'success');

			this.dispatchUser('patch', {
				id: this.currentUser.uid,
				disabled: true,
				deleted: true,
			});
		});
	}

	showSnackbar(text: string, color: string = this.snackbar.color!) {
		this.snackbar.isVisible = true;
		this.snackbar.text = text;
		this.snackbar.color = color;
	}

	closeFormDialog() {
		this.showFormDialog = false;
	}

	get headers(): DataTableHeader[] {
		return [
			{ text: 'Email', sortable: true, value: 'email' },
			{ text: 'Display Name', sortable: true, value: 'displayName' },
			{ text: 'Email Verified', value: 'emailVerified' },
			{ text: 'Disabled', value: 'disabled' },
			{ text: 'Nb Accounts', value: 'nb_accounts' },
			{ text: 'Roles', value: 'studioRolesIndex' },
			{ text: 'Actions', value: 'action', sortable: false },
		];
	}

	get isUserDisabled(): boolean {
		return this.currentUser.disabled;
	}

	get isUserEmailVerified(): boolean {
		return this.currentUser.emailVerified;
	}

	get formTitle(): string {
		return this.isEditing ? 'Edit User' : 'New User';
	}

	get accountsFormatted(): FirestoreAccount[] {
		return Object.values(this.accounts);
	}
}
</script>
