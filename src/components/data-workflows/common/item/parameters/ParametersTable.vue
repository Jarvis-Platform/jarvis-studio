<template>
	<v-container fluid>
		<v-col>
			<h2 class="black--text pb-3">
				{{ tableTitle }}

				<v-tooltip right>
					<template v-slot:activator="{ on }">
						<v-icon color="blue-grey lighten-5" dark v-on="on">info</v-icon>
					</template>
					<span>{{ description }}</span>
				</v-tooltip>
			</h2>

			<vue-good-table
				fixed-header
				max-height="75vh"
				class="word-break"
				:columns="columns"
				:rows="rows"
				:filterable="filterable"
				:search-options="searchOptions"
				styleClass="vgt-table striped condensed"
				:line-numbers="lineNumbers"
			>
				<div slot="emptystate">No information to display</div>

				<template slot="table-row" slot-scope="props">
					<component
						v-if="overriddenRow(props.column.field) && overriddenRow(props.column.field).name === props.column.field"
						:is="overriddenRow(props.column.field).component"
						v-bind="{
							...overriddenRow(props.column.field).props,
							index: props.index,
							displayValue: props.formattedRow[props.column.field],
						}"
					/>
					<span v-else>{{ props.formattedRow[props.column.field] }}</span>
				</template>
			</vue-good-table>
		</v-col>
	</v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AnyObject } from '@/types';
import { VueGoodTable } from 'vue-good-table';
import TableName from './overridden-rows/TableName.vue';

import 'vue-good-table/dist/vue-good-table.css';

@Component({
	components: { TableName, VueGoodTable },
})
export default class ParametersTable extends Vue {
	@Prop({ type: String, required: true }) tableTitle!: string;
	@Prop({ type: String, required: true }) description!: string;
	@Prop({ type: Array, required: true }) columns!: { label: string; field: string }[];
	@Prop({ type: Array, required: true }) rows!: AnyObject[];
	@Prop({ type: Boolean, default: true }) filterable!: boolean;
	@Prop({ type: Boolean, default: false }) searchOptionsEnabled!: boolean;

	@Prop(Boolean) lineNumbers?: boolean;
	@Prop(Array) overriddenRows?: AnyObject[];

	overriddenRow(rowName: string) {
		return this.overriddenRows ? this.overriddenRows.find((row) => row.name === rowName) : null;
	}

	get searchOptions() {
		return {
			enabled: this.searchOptionsEnabled,
			placeholder: 'Search for parameters',
		};
	}
}
</script>

<style lang="scss">
$start: 0;
$end: 9;

@for $i from $start through $end {
	.word-break td {
		word-break: break-all;
	}
}
</style>
