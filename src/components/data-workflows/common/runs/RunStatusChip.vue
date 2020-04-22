<template>
	<div>
		<v-menu v-model="showMenu" bottom right transition="scale-transition" origin="top left">
			<template v-slot:activator="{ on }">
				<v-chip
					v-on="userRole >= 2 ? on : ''"
					class="text-uppercase"
					:color="color"
					text-color="white"
					:small="isSmall"
					:label="isLabel"
				>
					<v-progress-circular v-if="isLoading" indeterminate size="20" color="primary" />
					<span v-else>{{ status }}</span>
				</v-chip>
			</template>

			<v-card width="220">
				<v-list dark>
					<v-list-item>
						<v-list-item-content>
							<v-list-item-title>Update run status</v-list-item-title>
							<v-list-item-subtitle>{{ status }}</v-list-item-subtitle>
						</v-list-item-content>

						<v-list-item-action>
							<v-btn icon @click="showMenu = false">
								<v-icon>mdi-close-circle</v-icon>
							</v-btn>
						</v-list-item-action>
					</v-list-item>
				</v-list>

				<v-list>
					<v-list-item v-for="runStatus in runStatusList" :key="runStatus.value" @click="updateStatus(runStatus.value)">
						<v-list-item-action>
							<v-icon>{{ runStatus.icon }}</v-icon>
						</v-list-item-action>
						<v-list-item-subtitle>{{ runStatus.value }}</v-list-item-subtitle>
					</v-list-item>
				</v-list>
			</v-card>
		</v-menu>

		<v-snackbar v-model="showSnackbar" color="info" :timeout="5000">
			Run status updated successfully
			<v-btn text @click="showSnackbar = false">Close</v-btn>
		</v-snackbar>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { RoleCode, RunStatus } from '@/types';
import { mdiCheckCircleOutline, mdiExclamationThick, mdiClockFast, mdiEyeCheckOutline } from '@mdi/js';
import store from '@/store';
import { Getter } from 'vuex-class';

@Component
export default class RunStatusChip extends Vue {
	@Prop({ required: true }) private status!: RunStatus;
	@Prop({ required: true }) private docId!: string;
	@Prop({ required: true }) private collection!: string;
	@Prop(Boolean) private isSmall!: boolean;
	@Prop(Boolean) private isLabel!: boolean;

	@Getter('user/role') userRole!: RoleCode;

	showMenu: boolean = false;
	showSnackbar: boolean = false;
	isLoading: boolean = false;

	updateStatus(value: string) {
		if (value === this.status) return;

		this.showSnackbar = false;
		this.isLoading = true;

		store.dispatch(`${this.collection}/patch`, { id: this.docId, status: value }).then(() => {
			this.isLoading = false;
			this.showSnackbar = true;
		});
	}

	get color() {
		if (this.isLoading) return 'blue-grey';

		let statusColor;
		switch (this.status) {
			case 'SUCCESS':
				statusColor = 'green';
				break;
			case 'FAILED':
				statusColor = 'red';
				break;
			case 'RUNNING':
				statusColor = 'light-blue';
				break;
			case 'CHECKED':
				statusColor = 'indigo';
				break;
			default:
				statusColor = 'orange';
				break;
		}
		return statusColor;
	}

	get runStatusList() {
		const runStatusList: { icon: string; value: RunStatus }[] = [
			{
				icon: mdiCheckCircleOutline,
				value: 'SUCCESS',
			},
			{
				icon: mdiExclamationThick,
				value: 'FAILED',
			},
			{
				icon: mdiClockFast,
				value: 'RUNNING',
			},
			{
				icon: mdiEyeCheckOutline,
				value: 'CHECKED',
			},
		];

		return runStatusList;
	}
}
</script>
