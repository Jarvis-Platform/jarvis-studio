<template>
	<div>
		<span class="table-name light-blue--text" @click="showDetailsDialog = true">{{ displayValue }}</span>

		<v-dialog v-model="showDetailsDialog" max-width="65%">
			<v-card min-height="90vh">
				<v-card-title class="headline">
					<span>Details</span>
					<v-spacer />
					<v-icon @click="showDetailsDialog = false">close</v-icon>
				</v-card-title>

				<v-card-text>
					<v-tabs v-model="tab" color="black" background-color="#E0E0E0" slider-color="primary" class="elevation-1">
						<v-tab v-for="tab in tabs" :key="tab.href" :href="`#${tab.href}`">{{ tab.label }}</v-tab>

						<v-tab-item :value="getTabHref(0)">
							<v-card flat tile>
								<v-card-text>
									<vue-good-table :columns="schemaColumns" :rows="schema" styleClass="vgt-table striped condensed" />
								</v-card-text>
							</v-card>
						</v-tab-item>

						<v-tab-item :value="getTabHref(1)">
							<v-card flat tile>
								<v-card-text>
									<parameters-list
										groupTitle="Table parameters"
										description="All parameters used with this table"
										:paramItems="parametersJson"
									/>
								</v-card-text>
							</v-card>
						</v-tab-item>

						<v-tab-item :value="getTabHref(2)">
							<v-card flat tile>
								<v-card-text>
									<vue-markdown :source="docMdDecoded" />
								</v-card-text>
							</v-card>
						</v-tab-item>
					</v-tabs>
				</v-card-text>
			</v-card>
		</v-dialog>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AnyObject, TableParameter } from '@/types';
import { Base64 } from 'js-base64';
import ViewJson from '@/components/data-workflows/common/item/json/ViewJson.vue';
import VueMarkdown from 'vue-markdown';
import ParametersList from '@/components/data-workflows/common/item/parameters/ParametersList.vue';

@Component({
	components: {
		ParametersList,
		ViewJson,
		'vue-good-table': require('vue-good-table').VueGoodTable,
		VueMarkdown,
	},
})
export default class TableName extends Vue {
	@Prop({ required: true }) item!: AnyObject;
	@Prop({ required: true }) destinations!: AnyObject;
	@Prop({ required: true }) index!: number;
	@Prop({ required: true }) displayValue!: number;

	showDetailsDialog: boolean = false;
	tab: null = null;

	getTabHref(index: number) {
		return this.tabs[index].href;
	}

	get tabs(): { label: string; href: string }[] {
		return [
			{
				label: 'schema',
				href: 'schema',
			},
			{
				label: 'parameters',
				href: 'parameters',
			},
			{
				label: 'documentation',
				href: 'documentation',
			},
		];
	}

	get destinationTable(): AnyObject {
		return this.destinations.tables[this.index];
	}

	get schemaColumns(): Object[] {
		return [
			{
				label: 'name',
				field: 'name',
				type: 'string',
			},
			{
				label: 'type',
				field: 'type',
				type: 'string',
			},
			{
				label: 'description',
				field: 'description',
				type: 'string',
			},
		];
	}

	get schema(): Object[] {
		return JSON.parse(Base64.decode(this.destinationTable.ddl_infos)).schema;
	}

	get parametersJson(): Object {
		const parameters: TableParameter[] = [
			{ id: 'source_format', label: 'source_format', value: this.destinations.source_format },
			{ id: 'create_disposition', label: 'create_disposition', value: this.destinations.create_disposition },
			{ id: 'write_disposition', label: 'write_disposition', value: this.destinations.write_disposition },
			{ id: 'skip_leading_rows', label: 'skip_leading_rows', value: this.destinations.skip_leading_rows },
			{ id: 'field_delimiter', label: 'field_delimiter', value: this.destinations.field_delimiter },
			{ id: 'quote_character', label: 'quote_character', value: this.destinations.quote_character },
			{ id: 'null_marker', label: 'null_marker', value: this.destinations.null_marker },
			{
				id: 'bq_load_job_ignore_unknown_values',
				label: 'bq_load_job_ignore_unknown_values',
				value: this.destinations.bq_load_job_ignore_unknown_values,
			},
			{
				id: 'bq_load_job_max_bad_records',
				label: 'bq_load_job_max_bad_records',
				value: this.destinations.bq_load_job_max_bad_records,
			},
			{
				id: 'bq_load_job_schema_update_options',
				label: 'bq_load_job_schema_update_options',
				value: this.destinations.bq_load_job_schema_update_options,
			},
			{
				id: 'bq_load_job_allow_quoted_newlines',
				label: 'bq_load_job_allow_quoted_newlines',
				value: this.destinations.bq_load_job_allow_quoted_newlines,
			},
			{
				id: 'bq_load_job_allow_jagged_rows',
				label: 'bq_load_job_allow_jagged_rows',
				value: this.destinations.bq_load_job_allow_jagged_rows,
			},
		];

		let indexesToSplice: number[] = [];
		parameters.forEach((element, index: number) => (!element.value ? indexesToSplice.push(index) : {}));

		for (let i = indexesToSplice.length - 1; i >= 0; i--) {
			parameters.splice(indexesToSplice[i], 1);
		}

		return parameters;
	}

	get docMdDecoded(): string {
		return this.destinationTable.doc_md ? Base64.decode(this.destinationTable.doc_md) : '/';
	}
}
</script>

<style lang="scss" scoped>
.table-name {
	cursor: pointer;
	text-decoration: underline;
}
</style>
