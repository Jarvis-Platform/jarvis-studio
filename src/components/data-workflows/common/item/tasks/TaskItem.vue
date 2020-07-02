<template>
	<v-card class="mb-3">
		<ParametersList
			:groupTitle="task.id"
			:tooltip="false"
			:paramItems="paramItemsTask"
			vflexLength="xs10"
			vflexOffset="offset-xs1"
		>
			<template v-slot:header>
				<v-chip :color="statusChipColor" text-color="white" class="mr-3">{{ task.status }}</v-chip>

				<v-dialog v-if="showLogs" v-model="logsDialog" width="1000">
					<template v-slot:activator="{ on }">
						<v-chip color="grey" text-color="white" v-on="on">Logs</v-chip>
					</template>

					<v-card>
						<v-card-title class="headline grey lighten-2" primary-title>Task logs: {{ task.id }}</v-card-title>

						<v-card-text>
							<logs-component
								:dag-id="getLogsProps.dagId"
								:task-id="getLogsProps.taskId"
								:dag-run-id="getLogsProps.dagRunId"
								:dag-type="getLogsProps.dagType"
								:dag-execution-date="getLogsProps.dagExecutionDate"
								class="px-0"
							/>
						</v-card-text>

						<v-card-actions>
							<v-spacer />
							<v-btn color="primary" text @click="logsDialog = false">Close</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</template>

			<template v-slot:footer>
				<v-toolbar flat color="transparent">
					<v-spacer />

					<v-dialog v-model="dialogSql" max-width="1000" fullscreen v-if="task.task_type === 'sql' && task.sql">
						<template v-slot:activator="{ on }">
							<v-chip color="orange" text-color="white" v-on="on" class="mr-2">VIEW SQL</v-chip>
						</template>

						<v-card>
							<v-card-title class="headline grey lighten-2" primary-title>
								{{ task.id }}
							</v-card-title>

							<v-card-text>
								<prism :code="task.sql" :plugins="['line-numbers']" language="sql" />
							</v-card-text>

							<v-card-actions>
								<v-spacer />

								<v-btn color="primary" text @click="dialogSql = false">Close</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>

					<v-dialog v-model="dialogSchema" max-width="1000" fullscreen v-if="task.task_type === 'create_gbq_table'">
						<template v-slot:activator="{ on }">
							<v-chip color="green" text-color="white" v-on="on" class="mr-2">VIEW SCHEMA</v-chip>
						</template>
						<v-card>
							<v-card-title class="headline grey lighten-2" primary-title>
								{{ task.id }}
							</v-card-title>

							<v-card-text>
								<tableSchemaView :schemaRows="task.bq_table_schema" />
							</v-card-text>

							<v-card-actions>
								<v-spacer />

								<v-btn color="primary" text @click="dialogSchema = false">Close</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>

					<v-dialog v-model="dialogLongDescription" width="1000">
						<template v-slot:activator="{ on }">
							<v-chip color="primary" text-color="white" v-on="on" class="mr-2">LONG DESCRIPTION</v-chip>
						</template>

						<v-card>
							<v-card-title class="headline grey lighten-2" primary-title>
								{{ task.id }}
							</v-card-title>

							<v-card-text>
								<vue-markdown :source="task.doc_md" />
							</v-card-text>

							<v-card-actions>
								<v-spacer />
								<v-btn color="primary" text @click="dialogLongDescription = false">Close</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</v-toolbar>
			</template>
		</ParametersList>
	</v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AnyObject } from '@/types';
import Prism from 'vue-prismjs';
import VueMarkdown from 'vue-markdown';

import ParametersList from '@/components/data-workflows/common/item/parameters/ParametersList.vue';
import tableSchemaView from '@/components/data-workflows/common/item/schema/TableSchemaView.vue';
import LogsComponent from '@/components/data-workflows/common/item/logs/LogsComponent.vue';

import { RUNS } from '@/constants/data-workflows/status';

import 'prismjs/themes/prism.css';

type CommunParam = {
	id: string;
	label: string;
	value: string;
	default: string | boolean;
	description: string;
};

@Component({
	components: { LogsComponent, ParametersList, VueMarkdown, Prism, tableSchemaView },
})
export default class TaskItem extends Vue {
	@Prop({ type: String, required: true }) type!: string;
	@Prop({ type: Object, required: true }) task!: AnyObject;
	@Prop({ type: Object, required: true }) dagContext!: AnyObject;
	@Prop({ type: String, required: true }) dagId!: string;
	@Prop({ type: String, required: true }) dagRunId!: string;
	@Prop({ type: String, required: true }) dagType!: string;
	@Prop({ type: String, required: true }) dagExecutionDate!: string;

	dialogSql: boolean = false;
	dialogSchema: boolean = false;
	dialogLongDescription: boolean = false;
	logsDialog: boolean = false;

	get paramItemsTask() {
		let communParams: CommunParam[] = [
			{
				id: 'short_description',
				label: 'Short Description',
				value: this.task.short_description,
				default: 'Id of the Task',
				description: 'Unique Id of the task in the dag ',
			},
			{
				id: 'task_type',
				label: 'Task Type',
				value: this.task.task_type,
				default: 'SQL',
				description: 'The type of the task (execute SQL or create Table',
			},
		];

		if (this.task.task_type === 'sql') {
			communParams.push({
				id: 'gcp_project_id',
				label: 'Table Project',
				value: this.task.gcp_project_id,
				default: this.dagContext.default_gcp_project_id,
				description: 'Project of the destination table (surcharge the default project at the dag level configuration)',
			});
			communParams.push({
				id: 'bq_dataset',
				label: 'Table Dataset',
				value: this.task.bq_dataset,
				default: this.dagContext.default_bq_dataset,
				description: 'Dataset of the destination table (surcharge the default dataset at the dag level configuration)',
			});
			communParams.push({
				id: 'table_name',
				label: 'Table Name',
				value: this.task.table_name,
				default: 'my_table',
				description: 'Name of the destination table generated by the SQL Query',
			});
			communParams.push({
				id: 'temporary_table',
				label: 'Temporary Table',
				value: this.task.temporary_table,
				default: false,
				description: "Define if it's a temporary table that will be deleted at the end of the Dag",
			});
			communParams.push({
				id: 'sql_file',
				label: 'Name of the SQL File',
				value: this.task.sql_file,
				default: 'my_sql_file.sql',
				description: 'Name of the .sql file with the query generating the destination table',
			});
		}

		if (this.task.task_type === 'copy_gbq_table') {
			communParams.push({
				id: 'gcp_project_id',
				label: 'Table Project',
				value: this.task.gcp_project_id,
				default: this.dagContext.default_gcp_project_id,
				description: 'Project of the destination table (surcharge the default project at the dag level configuration)',
			});
			communParams.push({
				id: 'bq_dataset',
				label: 'Table Dataset',
				value: this.task.bq_dataset,
				default: this.dagContext.default_bq_dataset,
				description: 'Dataset of the destination table (surcharge the default dataset at the dag level configuration)',
			});
			communParams.push({
				id: 'destination_bq_table',
				label: 'Destination table Name',
				value: this.task.destination_bq_table,
				default: 'my_table',
				description: 'Name of the destination table copied from source table',
			});
			communParams.push({
				id: 'destination_bq_table_date_suffix',
				label: 'Add Date suffix to destination table',
				value: this.task.destination_bq_table_date_suffix,
				default: false,
				description: 'Add the current date as a suffix to the destination table',
			});
			communParams.push({
				id: 'destination_bq_table_date_suffix_format',
				label: 'Date suffix format',
				value: this.task.destination_bq_table_date_suffix_format,
				default: '%Y%m%d',
				description: 'Format of the destination table date Suffix',
			});
		}

		return communParams;
	}

	get showLogs() {
		return this.type === RUNS;
	}

	get statusChipColor(): string {
		let color;

		switch (this.task.status) {
			case 'success':
				color = 'success';
				break;
			default:
				color = 'primary';
				break;
		}

		return color;
	}

	get getLogsProps() {
		return {
			dagId: this.dagId,
			taskId: this.task.id,
			dagRunId: this.dagRunId,
			dagType: this.dagType,
			dagExecutionDate: this.dagExecutionDate,
		};
	}
}
</script>
