<template>
	<v-container fluid>
		<div v-for="task in tasksFull" :key="task.id">
			<TablesToTablesConfTaskView
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

<script>
import TablesToTablesConfTaskView from '@/components/data-workflows/common/item/tasks/TaskItem.vue';
import { Base64 } from 'js-base64';

export default {
	components: {
		TablesToTablesConfTaskView
	},
	props: {
		type: {
			type: String,
			required: true
		},
		dagId: {
			type: String,
			required: true
		},
		dagRunId: {
			type: String,
			required: true
		},
		dagType: {
			type: String,
			required: true
		},
		dagExecutionDate: {
			type: String,
			required: true
		},
		tasksConf: {
			type: Array,
			required: true
		},
		tasksSQL: {
			type: Object,
			required: true
		},
		dagConf: {
			type: Object,
			required: true
		}
	},
	methods: {
		prepareSQL(sqlFile) {
			if (!sqlFile) return;

			let sql = '';
			if (sqlFile._binaryString !== undefined) {
				try {
					sql = Base64.decode(sqlFile._binaryString);
				} catch (error) {
					sql = 'No SQL Found';
					console.error(error);
				}
			} else {
				sql = sqlFile;
			}
			return sql;
		}
	},
	computed: {
		dagContext() {
			//make a deep copy of the dagConf
			let dagContext = JSON.parse(JSON.stringify(this.dagConf));
			let keyToDelete = 'workflow';
			delete dagContext[keyToDelete];
			return dagContext;
		},
		tasksFull() {
			let i;
			let tasksFull = this.tasksConf;
			for (i = 0; i < tasksFull.length; i++) {
				switch (tasksFull[i].task_type) {
					case 'create_gbq_table':
						break;
					case 'copy_gbq_table':
						break;
					case 'sql':
						//extract the SQL filename to find the binary SQL present in the tasksSql Object
						tasksFull[i].sql = this.prepareSQL(this.tasksSQL[tasksFull[i].id]);
						break;
					default:
						tasksFull[i].task_type = 'sql';
						//extract the binary SQL present in the tasksSql Object
						tasksFull[i].sql = this.prepareSQL(this.tasksSQL[tasksFull[i].id]);
				}
			}
			return tasksFull;
		}
	}
};
</script>
