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

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { DataItem } from '@/types';
import DagChart from '@/components/data-workflows/common/item/overview/DagChart.vue';
import ParametersList from '../parameters/ParametersList.vue';
import ParametersTable from '../parameters/ParametersTable.vue';
import ViewHeader from './ViewHeader.vue';

@Component({
	components: { DagChart, ParametersList, ParametersTable, ViewHeader }
})
export default class OverviewComponent extends Vue {
	@Prop({ type: Array, required: true }) data!: DataItem[];
}
</script>
