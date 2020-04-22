<template>
	<parameters-table
		tableTitle="Table Schema"
		description="Schema details of the table"
		:columns="schemaColumns"
		:rows="schemaRows"
		vflexLength="xs12"
		:lineNumbers="false"
		:searchOptionsEnabled="true"
	/>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ParametersTable from '@/components/data-workflows/common/item/parameters/ParametersTable.vue';

type Column = {
	label: string;
	field: string;
};

type Row = {
	name: string;
	type: string;
	mode: string;
	description: string;
};

@Component({
	components: { ParametersTable }
})
export default class TableSchemaView extends Vue {
	@Prop(Array) schemaRows?: Row[];

	schemaColumns: Column[] = [
		{ label: 'Name', field: 'name' },
		{ label: 'Type', field: 'type' },
		{ label: 'Mode', field: 'mode' },
		{ label: 'Description', field: 'description' }
	];
}
</script>
