<template>
	<div>
		<v-alert v-if="item.archived" type="warning">This configuration is archived.</v-alert>

		<v-row v-if="activeHeader" class="pl-5 pt-4 pr-5">
			<span class="headline font-weight-black text-truncate complementary--text">{{ viewId }}</span>

			<v-spacer />

			<v-btn text color="grey" @click="goBack()">Go Back</v-btn>

			<template v-if="viewType === 'conf'">
				<configuration-status
					class="mr-3"
					:item="item"
					:collection="collection"
					:is-activated="item.activated"
					:is-small="false"
					:is-label="true"
				/>

				<v-chip
					v-if="showDagLaunch"
					color="menu"
					text-color="white"
					label
					class="mr-3 text-uppercase"
					@click="toggleDagLaunchDialog"
				>
					Launch
				</v-chip>

				<v-menu offset-y v-if="!item.archived || isSuperAdmin">
					<template v-slot:activator="{ on }">
						<v-icon v-on="on">more_vert</v-icon>
					</template>

					<v-list>
						<v-list-item @click="item.archived ? toggleArchiveConf() : showArchiveDialog()">
							<v-list-item-title>{{ archiveLabel }}</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>

				<v-dialog v-model="showDagLaunchDialog" persistent max-width="700">
					<v-card>
						<v-card-title class="headline primary">Confirmation</v-card-title>
						<v-card-text>
							<p class="mt-4">
								Please, confirm the launch of <strong>"{{ viewId }}"</strong> configuration.
							</p>

							<v-switch v-model="showExecutionDateParams" label="Specify the execution date" />

							<v-row v-if="showExecutionDateParams">
								<v-col cols="6">
									<v-menu
										v-model="showDagExecutionDayMenu"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										max-width="290px"
										min-width="290px"
									>
										<template v-slot:activator="{ on }">
											<v-text-field
												v-model="dagExecutionDay"
												readonly
												label="Day"
												persistent-hint
												prepend-icon="event"
												v-on="on"
											/>
										</template>
										<v-date-picker v-model="dagExecutionDay" no-title @input="showDagExecutionDayMenu = false" />
									</v-menu>
								</v-col>

								<v-col cols="6">
									<v-menu
										ref="menu"
										v-model="showDagExecutionTimeMenu"
										readonly
										:close-on-content-click="false"
										:nudge-right="40"
										:return-value.sync="dagExecutionTime"
										transition="scale-transition"
										offset-y
										max-width="290px"
										min-width="290px"
									>
										<template v-slot:activator="{ on }">
											<v-text-field
												v-on="on"
												v-model="dagExecutionTime"
												label="Time"
												prepend-icon="access_time"
												readonly
											/>
										</template>
										<v-time-picker
											v-model="dagExecutionTime"
											full-width
											@click:minute="$refs.menu.save(dagExecutionTime)"
										/>
									</v-menu>
								</v-col>
							</v-row>

							<p v-if="dagLaunchErrorMsg" class="red--text">{{ dagLaunchErrorMsg }}</p>
						</v-card-text>
						<v-card-actions>
							<v-spacer />
							<v-btn color="primary" text @click="toggleDagLaunchDialog">Cancel</v-btn>

							<transition name="fade" mode="out-in">
								<v-progress-circular v-if="isLoading" indeterminate size="20" color="primary" />
								<v-btn v-else color="primary" @click="launchDag">Launch</v-btn>
							</transition>
						</v-card-actions>
					</v-card>
				</v-dialog>

				<v-dialog v-model="isArchiveDialogVisible" persistent max-width="400">
					<v-card>
						<v-card-title class="headline warning">Warning</v-card-title>
						<v-card-text>
							<p class="mt-4">
								Please confirm the archiving of <strong>{{ item.id }}.</strong>
							</p>
						</v-card-text>
						<v-card-actions>
							<v-spacer />
							<v-btn color="primary" text @click="hideArchiveDialog">Close</v-btn>

							<transition name="fade" mode="out-in">
								<v-progress-circular v-if="isLoading" indeterminate size="20" color="primary" />
								<v-btn v-else color="primary" text @click="toggleArchiveConf">Archive</v-btn>
							</transition>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</template>

			<RunStatusChip
				v-if="viewType === 'run'"
				:status="runStatus"
				:doc-id="item.id"
				:collection="collection"
				is-label
			/>
		</v-row>

		<v-row v-else class="pl-5 pt-4 pr-5">
			<span class="headline font-weight-bold">{{ viewId }}</span>
			<v-spacer />
			<v-btn text v-if="link" @click="redirectToConfiguration" class="text--secondary">View current</v-btn>

			<template v-if="viewType === 'status'">
				<v-btn color="complementary" class="mr-3" @click="resetWorkflowStatus">Reset</v-btn>
				<jobs-ratio :jobs="item.jobs" />
			</template>
		</v-row>

		<v-row v-if="description" class="pl-5 pr-5 pt-3 pb-3">
			<span class="subheading">{{ description }}</span>
		</v-row>

		<v-snackbar v-model="launchSnackBar.isVisible" :color="launchSnackBar.color" :timeout="launchSnackBar.timeout">
			{{ launchSnackBar.text }}
		</v-snackbar>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { AnyObject, Snackbar } from '@/types';
import ConfigurationStatus from '@/components/data-workflows/common/configuration/ConfigurationStatus.vue';
import JobsRatio from '@/components/data-workflows/common/status/jobs-ratio.vue';
import RunStatusChip from '@/components/data-workflows/common/runs/RunStatusChip.vue';
import { CONFIGURATIONS } from '@/constants/data-workflows/status';
import { DATA_WORKFLOWS } from '@/constants/router/paths-prefixes';
import { SNACKBAR } from '@/constants/ui/snackbar';
import { workflowStatus } from '@/store/modules/easy-firestore/workflow-status';

// TODO: Refactor viewType possible values with constants
// TODO: Refactor by removing headerActive prop to be based on viewType

@Component({
	components: { ConfigurationStatus, JobsRatio, RunStatusChip },
})
export default class ViewHeader extends Vue {
	@Prop({ required: true }) readonly activeHeader!: boolean;
	@Prop({ required: true }) readonly viewId!: string;
	@Prop({ required: true }) readonly viewType!: string;
	@Prop({ required: true }) readonly item!: AnyObject;
	@Prop(Boolean) readonly showDagLaunch!: boolean;
	@Prop(Object) readonly dagConf!: Object;
	@Prop(String) readonly collection: string | undefined;
	@Prop(String) readonly runStatus: string | undefined;
	@Prop(String) readonly description: string | undefined;

	@Getter('user/isSuperAdmin') isSuperAdmin!: number;

	isLoading: boolean = false;
	showDagLaunchDialog: boolean = false;
	launchSnackBar: Snackbar = {
		color: '',
		isVisible: false,
		text: '',
		timeout: SNACKBAR.TIMEOUT,
	};
	isArchiveDialogVisible: boolean = false;
	showExecutionDateParams: boolean = false;
	dagExecutionDay: string = '';
	showDagExecutionDayMenu: boolean = false;
	dagExecutionTime: string = '';
	showDagExecutionTimeMenu: boolean = false;
	dagLaunchErrorMsg: string = '';

	goBack() {
		this.$router.go(-1);
	}

	toggleDagLaunchDialog() {
		this.showDagLaunchDialog = !this.showDagLaunchDialog;
	}

	launchDag() {
		this.isLoading = true;

		let data: AnyObject = {
			configurationType: this.item.configuration_type,
			dagId: this.item.id,
			dagConf: this.dagConf ? this.dagConf : {},
		};

		if (this.dagExecutionDay && this.dagExecutionTime) {
			const date = new Date(`${this.dagExecutionDay}:${this.dagExecutionTime}`);
			data.dagExecutionDate = this.$moment(date).format();
		}

		this.$httpsCallableFunction('fd-io-api-composer-dag-trigger', data)
			.then(() => {
				this.isLoading = false;
				this.toggleDagLaunchDialog();
				this.launchSnackBar.isVisible = true;
				this.launchSnackBar.color = 'success';
				this.launchSnackBar.text = 'Dag will be launched in about 3min';
			})
			.catch((err) => {
				this.isLoading = false;
				this.launchSnackBar.isVisible = true;
				this.dagLaunchErrorMsg = err;
			});
	}

	showArchiveDialog() {
		this.isArchiveDialogVisible = true;
	}

	hideArchiveDialog() {
		this.isArchiveDialogVisible = false;
	}

	toggleArchiveConf() {
		const payload = this.item.archived
			? { id: this.item.id, archived: !this.item.archived }
			: { id: this.item.id, activated: false, archived: !this.item.archived };

		this.isLoading = true;

		this.$store.dispatch(`${this.collection}/patch`, payload).then(() => {
			this.hideArchiveDialog();
			this.isLoading = false;
		});
	}

	redirectToConfiguration() {
		this.$router.push(this.link);
	}

	resetWorkflowStatus() {
		this.$store.dispatch(`${workflowStatus.moduleName}/patch`, { id: this.item.id, jobs: {} });
	}

	get archiveLabel(): string {
		return this.item.archived ? 'Unarchive' : 'Archive';
	}

	get link(): string {
		const workflowType = this.$route.path.split('/')[2];
		const docType = this.$route.path.split('/')[3];

		if (this.viewType !== 'conf' || docType === CONFIGURATIONS) return '';
		return `/${DATA_WORKFLOWS}/${workflowType}/${CONFIGURATIONS}/${this.viewId}`;
	}
}
</script>
