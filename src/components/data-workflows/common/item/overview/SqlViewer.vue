<template>
	<v-dialog v-model="showDialog" max-width="1000" fullscreen>
		<template v-slot:activator="{ on }">
			<v-chip color="orange" text-color="white" v-on="on" class="mr-2">VIEW SQL</v-chip>
		</template>

		<v-card>
			<v-card-title class="headline grey lighten-2" primary-title>
				{{ properties.id }}
			</v-card-title>

			<v-card-text>
				<prism :code="rawSQL" :plugins="['line-numbers']" language="sql" />
			</v-card-text>

			<v-card-actions>
				<v-spacer />

				<v-btn color="primary" text @click="closeDialog">Close</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AnyObject } from '@/types';
import { Base64 } from 'js-base64';
import Prism from 'vue-prismjs';

import 'prismjs/themes/prism.css';

@Component({
	components: { Prism }
})
export default class SQLViewer extends Vue {
	@Prop(Object) properties!: AnyObject;

	showDialog: boolean = false;

	closeDialog() {
		this.showDialog = false;
	}

	get rawSQL() {
		let sql = '';
		if (this.properties.sqlBinary !== undefined) {
			sql = Base64.decode(this.properties.sqlBinary._binaryString);
		} else if (this.properties.sql !== undefined) {
			sql = this.properties.sql;
		} else {
			sql = 'No SQL Data';
		}
		return sql;
	}
}
</script>
