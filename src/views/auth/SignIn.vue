<template>
	<v-app id="signin" dark>
		<v-content>
			<v-container class="fill-height pa-0" fluid>
				<v-row class="fill-height" no-gutters>
					<v-col
						v-if="$vuetify.breakpoint.mdAndUp"
						class="infos-panel d-flex flex-column justify-space-between"
						:style="{ backgroundImage: `url('${background}')` }"
					>
						<img src="@/assets/img/app/logo.png" alt="Jarvis Logo" class="logo mb-8 ml-8" />
					</v-col>

					<v-col class="form-panel">
						<div class="content d-flex flex-column justify-center">
							<h1 class="mb-7">Welcome to <span class="primary--text">Jarvis Studio</span></h1>
							<p class="mb-7">
								A secure, intelligent, useful Big Data platform designed from scratch to address the fashion issues.
							</p>

							<v-form ref="form" v-model="valid">
								<v-text-field
									name="login"
									label="Login"
									id="Email"
									type="email"
									v-model="model.email"
									:rules="emailRules"
									required
									data-cy="signInEmailField"
								>
								</v-text-field>
								<v-text-field
									name="password"
									label="Password"
									id="password"
									type="password"
									v-model="model.password"
									:rules="passwordRules"
									required
									data-cy="signInPasswordField"
								>
								</v-text-field>
							</v-form>

							<v-alert v-if="userNotAuthorized" type="error" class="my-5">
								Sorry, cannot authorize user
							</v-alert>

							<div class="d-flex justify-space-between align-center mt-5">
								<router-link to="#" class="ma-0">Forgot password?</router-link>
								<v-btn :disabled="!valid" :loading="loading" @click="signIn" color="primary">
									Sign in
								</v-btn>
							</div>
						</div>

						<div class="social-authentications d-flex flex-column justify-center align-center">
							<button type="button" class="google-button mb-3" @click="googleSignIn">
								<span class="google-button__icon">
									<svg viewBox="0 0 366 372" xmlns="http://www.w3.org/2000/svg">
										<path
											d="M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z"
											id="Shape"
											fill="#EA4335"
										/>
										<path
											d="M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z"
											id="Shape"
											fill="#FBBC05"
										/>
										<path
											d="M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z"
											id="Shape"
											fill="#4285F4"
										/>
										<path
											d="M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z"
											fill="#34A853"
										/>
									</svg>
								</span>
								<span class="google-button__text">Sign in with Google</span>
							</button>

							<p class="ma-0">Still without account? <router-link to="#">Create one</router-link></p>
						</div>
					</v-col>
				</v-row>
			</v-container>
		</v-content>
	</v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { InputValidationRules } from 'vuetify';
import { HOME } from '@/constants/router/routes-names';
import { KEY } from '@/constants/store/vuex-persist';

import background from '@/assets/img/sign-in/background.jpg';

type Model = {
	email: string;
	password: string;
};

@Component({
	props: {
		source: String
	}
})
export default class SignIn extends Vue {
	valid: boolean = false;
	userNotAuthorized: boolean = false;
	loading: boolean = false;
	model: Model = { email: '', password: '' };
	emailRules: InputValidationRules = [v => !!v || 'E-mail is required', v => /.+@.+/.test(v) || 'E-mail must be valid'];
	passwordRules: InputValidationRules = [
		v => !!v || 'Password is required',
		v => v.length >= 6 || 'Password must be greater than 6 characters'
	];

	get background(): File {
		return background;
	}

	mounted() {
		localStorage.removeItem(KEY);
	}

	googleSignIn() {
		this.userNotAuthorized = false;
		this.loading = true;

		this.$store
			.dispatch('user/googleSignIn')
			.then(() => this.successCallback())
			.catch(() => this.errorCallback());
	}

	signIn() {
		this.userNotAuthorized = false;
		this.loading = true;

		if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
			this.$store
				.dispatch('user/signIn', { email: this.model.email, password: this.model.password })
				.then(() => this.successCallback())
				.catch(() => this.errorCallback());
		}
	}

	successCallback() {
		this.loading = false;
		this.$router.push(this.$route.query.redirect.toString() || { name: HOME });
	}

	errorCallback() {
		this.loading = false;
		this.userNotAuthorized = true;
	}
}
</script>

<style lang="scss">
@import '~vuetify/src/styles/settings/_variables';

.infos-panel {
	box-sizing: border-box;
	background-size: cover;
	background-position: right center;
	background-repeat: no-repeat;

	.logo {
		width: 200px;
	}
}

.form-panel {
	.content {
		margin: 0 auto;
		max-width: 65%;
		height: 80vh;

		@media #{map-get($display-breakpoints, 'sm-and-down')} {
			max-width: 85%;
		}
	}

	.social-authentications {
		height: 20vh;
		background-color: #e9e9e9;

		.google-button {
			height: 40px;
			border-width: 0;
			background: white;
			color: #737373;
			border-radius: 5px;
			white-space: nowrap;
			box-shadow: 1px 1px 0px 1px rgba(0, 0, 0, 0.05);
			transition-property: background-color, box-shadow;
			transition-duration: 150ms;
			transition-timing-function: ease-in-out;
			padding: 0;

			&:focus,
			&:hover {
				box-shadow: 1px 4px 5px 1px rgba(0, 0, 0, 0.1);
			}

			&:active {
				background-color: #e5e5e5;
				box-shadow: none;
				transition-duration: 10ms;
			}
		}

		.google-button__icon {
			display: inline-block;
			vertical-align: middle;
			margin: 8px 0 8px 8px;
			width: 18px;
			height: 18px;
			box-sizing: border-box;
		}

		.google-button__icon--plus {
			width: 27px;
		}

		.google-button__text {
			display: inline-block;
			vertical-align: middle;
			padding: 0 24px;
			font-size: 14px;
			font-weight: bold;
			font-family: 'Roboto', arial, sans-serif;
		}
	}
}
</style>
