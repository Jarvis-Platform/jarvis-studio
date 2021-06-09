<template>
	<v-app id="signin" dark>
		<v-main>
			<v-container class="fill-height pa-0" fluid>
				<v-row class="fill-height" no-gutters>
					<v-col
						v-if="$vuetify.breakpoint.mdAndUp"
						class="infos-panel"
						:style="{ backgroundImage: `url('${background}')` }"
					>
						<img src="@/assets/img/app/logo.png" alt="Tailer Logo" class="logo mt-8 mr-8 float-right" />
					</v-col>

					<v-col class="form-panel">
						<div class="content d-flex flex-column justify-center">
							<h1 class="mb-7">Reset your <span class="primary--text">password</span></h1>

							<v-form ref="form" v-model="valid">
								<v-text-field
									name="email"
									label="Email"
									type="email"
									v-model="model.email"
									:rules="emailRules"
									required
								/>
							</v-form>

							<div class="d-flex justify-space-between align-center mt-5">
								<router-link :to="loginLink" class="ma-0">Return to login page</router-link>
								<v-btn :disabled="!valid" :loading="loading" @click="sendEmail" color="primary">Send mail</v-btn>
							</div>
						</div>

						<div class="social-authentications d-flex flex-column justify-center align-center" />
					</v-col>
				</v-row>
			</v-container>
		</v-main>

		<v-snackbar v-model="showSnackbar" color="success" :timeout="7000">
			An email has been sent to {{ model.email }}
		</v-snackbar>
	</v-app>
</template>

<script lang="ts">
import firebase from 'firebase';
import { Component, Vue } from 'vue-property-decorator';
import { InputValidationRules } from 'vuetify';
import { SIGN_IN } from '@/constants/router/routes-names';

import background from '@/assets/img/sign-in/background.jpg';

@Component
export default class SignIn extends Vue {
	valid: boolean = false;
	loading: boolean = false;
	model = { email: '' };
	emailRules: InputValidationRules = [
		(v) => !!v || 'E-mail is required',
		(v) => /.+@.+/.test(v) || 'E-mail must be valid',
	];
	showSnackbar = false;

	sendEmail() {
		this.loading = true;
		if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
			firebase.auth().sendPasswordResetEmail(this.model.email);
			this.showSnackbar = true;
			this.loading = false;
		}
	}

	get background(): File {
		return background;
	}

	get loginLink() {
		return { name: SIGN_IN };
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
