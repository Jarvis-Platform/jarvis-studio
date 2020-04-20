<template>
	<v-container>
		<v-row>
			<v-col cols="12" offset="0">
				<template v-for="(item, index) in data">
					<component
						v-if="!item.hasOwnProperty('displayCondition') || item.displayCondition"
						:key="`${item.component}-${index}`"
						:is="item.component"
						v-bind="item.props"
					/>
				</template>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import DagChart from '@/components/data-workflows/common/item/overview/DagChart';
import ParametersList from '../parameters/ParametersList';
import ParametersTable from '../parameters/ParametersTable';
import ViewHeader from './ViewHeader';

export default {
	name: 'overview-component',
	components: { DagChart, ParametersList, ParametersTable, ViewHeader },
	props: {
		data: {
			type: Array,
			required: true
		}
	}
};
</script>
