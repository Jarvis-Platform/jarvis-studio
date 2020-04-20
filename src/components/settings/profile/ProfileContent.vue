<template>
	<v-container class="py-0">
		<v-row class="px-6 py-12">
			<v-col cols="4" class="pa-0">
				<avatar-component :user="user" size="x-large" class="d-block mx-auto mb-5" />

				<div class="mb-6 text-center">
					<h2 class="headline mb-0">{{ user.displayName }}</h2>
				</div>

				<div v-for="information in generalInformation" :key="information.label" class="d-flex align-center mb-2">
					<v-icon color="primary" class="mr-3 pa-1 icon" small>{{ information.icon }}</v-icon>
					<span class="mr-3 body-2">{{ information.label }}:</span>
					<input
						type="text"
						v-debounce:1s="value => saveUserInformation(information.label, value)"
						:placeholder="information.placeholder"
						:value="information.value"
						class="primary--text font-weight-light body-2 input"
					/>
					<v-icon
						v-if="information.value"
						color="primary"
						small
						class="ml-3"
						@click="copyInformationValue(information.value)"
					>
						mdi-content-copy
					</v-icon>
				</div>
			</v-col>

			<v-col cols="8" class="pa-0">
				<v-card flat>
					<ParametersList groupTitle="Identity" description="Identity of the user profile" :paramItems="userIdentity" />

					<ParametersList
						groupTitle="Role and Accounts"
						description="The user role and the accounts"
						:paramItems="userRolesAndAccounts"
					/>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { User } from '@/types';
import { Getter, State } from 'vuex-class';
import { users } from '@/store/modules/easy-firestore/users';
import { copyToClipboard } from '@/util/copy-to-clipboard';

import AvatarComponent from '@/components/common/AvatarComponent.vue';
import ParametersList from '@/components/data-workflows/common/item/parameters/ParametersList.vue';
import ProfileAccounts from './ProfileAccounts.vue';

@Component({
	components: { AvatarComponent, ParametersList }
})
export default class InformationTab extends Vue {
	@State(state => Object.values(state.users.data)[0]) currentUser!: User;

	@Getter('user/user') user!: User;

	mounted() {
		this.$store.dispatch(`${users.moduleName}/fetchById`, this.user.uid);
	}

	saveUserInformation(key: string, value: string) {
		const lowerCaseKey = key.toLowerCase();

		this.$store.dispatch(`${users.moduleName}/patch`, {
			id: this.user.uid,
			[lowerCaseKey]: value
		});
	}

	copyInformationValue(informationValue: string) {
		// TODO: Add visual validation
		copyToClipboard(informationValue);
	}

	get generalInformation() {
		return [
			{
				icon: 'mdi-account',
				label: 'Title',
				placeholder: 'Enter a title',
				value: this.currentUser ? this.currentUser.title : ''
			},
			{
				icon: 'mdi-email-outline',
				label: 'Email',
				placeholder: 'Enter an email',
				value: this.currentUser ? this.currentUser.email : ''
			},
			{
				icon: 'mdi-phone',
				label: 'Phone',
				placeholder: 'Enter a phone number',
				value: this.currentUser ? this.currentUser.phone : ''
			},
			{
				icon: 'mdi-map-marker',
				label: 'Location',
				placeholder: 'Enter a location',
				value: this.currentUser ? this.currentUser.location : ''
			},
			{
				icon: 'mdi-clock-outline',
				label: 'Timezone',
				placeholder: 'Enter a timezone',
				value: this.currentUser ? this.currentUser.timezone : ''
			}
		];
	}

	get userIdentity() {
		return [
			{ id: 'email', label: 'Email', value: this.user.email },
			{ id: 'emailVerified', label: 'Email Verified', value: this.user.emailVerified },
			{ id: 'creationTime', label: 'Creation Time', value: this.user.metadata.creationTime }
		];
	}

	get userRolesAndAccounts() {
		return [
			{ id: 'studioRoles', label: 'Role', value: this.user.studioRoles },
			{
				id: 'userAccounts',
				label: 'User Accounts',
				component: ProfileAccounts,
				properties: {
					accounts: this.user.accounts
				}
			}
		];
	}
}
</script>

<style lang="scss">
.icon {
	border-radius: 50%;
	border: 1px solid $primary-color;
	background-color: white;
}

.input {
	flex: 1;

	&::placeholder {
		color: #bdbdbd !important;
	}
}
</style>
