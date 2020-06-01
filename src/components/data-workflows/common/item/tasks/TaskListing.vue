<template>
	<v-container fluid>
		<div v-for="task in tasksFull" :key="task.id">
			<task-item
				:type="type"
				:task="task"
				:dagContext="dagContext"
				:dag-id="dagId"
				:dag-run-id="dagRunId"
				:dag-type="dagType"
				:dag-execution-date="dagExecutionDate"
			/>
		</div>
	</v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AnyObject } from '@/types';
import { Base64 } from 'js-base64';

import TaskItem from '@/components/data-workflows/common/item/tasks/TaskItem.vue';

@Component({
	components: { TaskItem },
})
export default class TaskListing extends Vue {
	@Prop({ type: String, required: true }) type!: string;
	@Prop({ type: String, required: true }) dagId!: string;
	@Prop({ type: String, required: true }) dagRunId!: string;
	@Prop({ type: String, required: true }) dagType!: string;
	@Prop({ type: String, required: true }) dagExecutionDate!: string;
	@Prop({ type: Array, required: true }) tasksConf!: AnyObject[];
	@Prop({ type: Object, required: true }) tasksSQL!: object;
	@Prop({ type: Object, required: true }) dagConf!: object;

	prepareSQL(sqlFile: AnyObject) {
		if (!sqlFile) return;

		let sql;

		if (sqlFile._binaryString !== undefined) {
			try {
				sql = Base64.decode(sqlFile._binaryString);
			} catch (error) {
				sql = 'No SQL Found';
				console.error(error);
			}
		} else {
			sql = typeof sqlFile === 'string' ? sqlFile : Base64.decode(Base64.decode(sqlFile.toBase64()));
		}

		return sql;
	}

	get dagContext() {
		//make a deep copy of the dagConf
		let dagContext = JSON.parse(JSON.stringify(this.dagConf));
		let keyToDelete = 'workflow';
		delete dagContext[keyToDelete];
		return dagContext;
	}

	get tasksFull() {
		let i;
		let tasksFull = this.tasksConf;
		for (i = 0; i < tasksFull.length; i++) {
			switch (tasksFull[i].task_type) {
				case 'create_gbq_table':
					break;
				case 'copy_gbq_table':
					break;
				case 'sql':
					tasksFull[i].sql = this.prepareSQL(this.tasksSQL[tasksFull[i].id]);
					break;
				default:
					tasksFull[i].task_type = 'sql';
					tasksFull[i].sql = this.prepareSQL(this.tasksSQL[tasksFull[i].id]);
			}
		}
		return tasksFull;
	}
}
</script>
