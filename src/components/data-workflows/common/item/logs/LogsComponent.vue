<template>
	<v-container class="py-6">
		<div v-if="isLoading" class="text-center">
			<v-progress-circular indeterminate size="42" color="primary" />
		</div>

		<div v-else>
			<div v-if="hasError">
				<h2>Path: {{ path }}</h2>
				{{ errorMsg }}
			</div>

			<div v-else-if="Object.keys(logs).length === 1">
				<v-btn color="primary" class="mb-4" @click="downloadLogFile(Object.keys(logs)[0])">
					Download log file
				</v-btn>
				<pre class="log pb-4">{{ Object.values(logs)[0] }}</pre>
			</div>

			<v-tabs
				v-else
				v-model="activeTab"
				color="black"
				background-color="#E0E0E0"
				slider-color="primary"
				class="elevation-1"
			>
				<v-tab v-for="logKey in Object.keys(logs)" :key="logKey" :href="`#${logKey}`" v-text="logKey" ripple />

				<v-tab-item v-for="logKey in Object.keys(logs)" :key="logKey" :value="logKey">
					<v-btn color="primary" class="my-4" @click="downloadLogFile(logKey)">Download log file</v-btn>
					<pre class="log pb-4">{{ logs[logKey] }}</pre>
				</v-tab-item>
			</v-tabs>
		</div>
	</v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AnyObject } from '@/types';
import { firebase } from '@/config/firebase';
import { Base64 } from 'js-base64';

@Component
export default class LogsComponent extends Vue {
	isLoading: boolean = false;
	hasError: boolean = false;
	errorMsg: string = '';
	logs: AnyObject = {};
	activeTab: null = null;

	@Prop({ required: true }) private dagId!: string;
	@Prop({ required: true }) private dagRunId!: string;
	@Prop({ required: true }) private dagType!: string;
	@Prop({ required: true }) private dagExecutionDate!: string;
	@Prop(String) private taskId?: string;

	mounted() {
		this.getLogs();
	}

	getLogs(): void {
		let decodedLogFiles: AnyObject = [];
		const getAirflowLogs = firebase.functions().httpsCallable('fd-io-api-airflow-logs-manager');

		this.isLoading = true;

		getAirflowLogs({
			dagId: this.dagId,
			taskId: this.taskId,
			dagRunId: this.dagRunId,
			dagType: this.dagType,
			dagExecutionDate: this.dagExecutionDate
		})
			.then(res => {
				const data = res.data;

				Object.keys(data).forEach(key => {
					decodedLogFiles[key] = Base64.decode(data[key]);
				});

				this.logs = decodedLogFiles;
				this.isLoading = false;
			})
			.catch(err => {
				this.hasError = true;
				this.errorMsg = err;
				this.isLoading = false;
			});
	}

	downloadLogFile(airflowFileName: string): void {
		const fileName = this.taskId
			? `${this.dagId}-${this.taskId}-${this.dagExecutionDate}-${airflowFileName}`
			: `${this.dagId}-${this.dagExecutionDate}-${airflowFileName}`;

		const element = document.createElement('a');
		element.setAttribute('href', `data:text/plain;charset=utf-8,${this.logs[airflowFileName]}`);
		element.setAttribute('download', fileName);
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}

	get path(): string {
		return `logs/${this.dagId}/${this.taskId}/${this.dagExecutionDate}`;
	}
}
</script>

<style lang="scss">
.log {
	max-width: 100%;
	overflow-y: scroll;
}
</style>
