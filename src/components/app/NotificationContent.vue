<template>
	<div>
		<v-toolbar flat prominent dark class="primary">
			<v-toolbar-title>Notifications</v-toolbar-title>

			<v-spacer />

			<v-btn icon @click="$emit('closeNotifications')">
				<v-icon>close</v-icon>
			</v-btn>
		</v-toolbar>

		<v-list subheader dense>
			<v-subheader>All notifications</v-subheader>

			<v-list-item>
				<v-list-item-action>
					<v-icon>person_add</v-icon>
				</v-list-item-action>
				<v-list-item-title>12 new users registered</v-list-item-title>
			</v-list-item>

			<v-divider />

			<v-list-item>
				<v-list-item-action>
					<v-icon>data_usage</v-icon>
				</v-list-item-action>

				<v-list-item-title>DB overloaded 80%</v-list-item-title>
			</v-list-item>
		</v-list>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class NotificationContent extends Vue {}
</script>
