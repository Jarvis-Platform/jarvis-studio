<template>
	<v-row align="center" justify="end" class="pr-5">
		<v-menu
			v-for="(filter, filterIndex) in filters"
			:key="`${filter.values[0].label}-${filterIndex}`"
			transition="slide-y-transition"
			bottom
		>
			<template v-slot:activator="{ on }">
				<v-btn small outlined v-on="on" class="mr-3">
					{{ filter.selectedValue.label }}
					<v-icon>arrow_drop_down</v-icon>
				</v-btn>
			</template>

			<v-list>
				<v-list-item
					v-for="(option, optionIndex) in filters[filterIndex].values"
					:key="`${option.value}-${optionIndex}`"
					@click="filters[filterIndex].clickAction(option)"
				>
					<v-list-item-title>{{ option.label }}</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>
	</v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ConfActivatedFilter, DateFilter, EnvFilter, RunStatusFilter } from '@/types';
import { Getter, State } from 'vuex-class';
import store from '@/store';
import { CONFIGURATIONS, RUNS, STATUS } from '@/constants/data-workflows/status';

@Component
export default class DataManagementFilters extends Vue {
	@Prop({ required: true }) type!: any;

	@State((state) => state.filters.envFilterSelected) envFilterSelected!: EnvFilter;
	@State((state) => state.filters.envFilters) envFilters!: EnvFilter[];
	@State((state) => state.filters.runStatusFilterSelected) runStatusFilterSelected!: RunStatusFilter;
	@State((state) => state.filters.runStatusFilters) runStatusFilters!: RunStatusFilter[];
	@State((state) => state.filters.confActivatedFilterSelected) confActivatedFilterSelected!: ConfActivatedFilter;
	@State((state) => state.filters.confActivatedFilters) confActivatedFilters!: ConfActivatedFilter[];
	@State((state) => state.filters.dateFilterSelected) dateFilterSelected!: DateFilter;
	@State((state) => state.filters.dateFilters) dateFilters!: DateFilter[];
	@State((state) => state.filters.minDateFilter) minDateFilter!: string;

	@Getter('user/isSuperAdmin') isSuperAdmin!: number;

	created() {
		if (
			this.dateFilterSelected.value === 0 &&
			!this.$moment(new Date()).isSame(this.$moment(this.minDateFilter), 'day')
		) {
			this.$store.commit('filters/updateMinDateFilter', this.dateFilterSelected);
		}
	}

	// TODO: Refactoring
	mounted() {
		const hasArchivedOption = this.confActivatedFilters.find((element) => String(element.label) === 'Archived');

		if (this.isSuperAdmin && !hasArchivedOption) {
			this.confActivatedFilters.push({ label: 'Archived', value: true });
		}
	}

	applyEnvFilter(envFilterSelected: EnvFilter): void {
		store.dispatch('filters/applyEnvFilterSelected', envFilterSelected);
	}

	applyRunStatusFilter(runStatusSelected: RunStatusFilter): void {
		store.dispatch('filters/applyRunStatusFilterSelected', runStatusSelected);
	}

	applyConfActivatedFilter(confActivatedSelected: ConfActivatedFilter): void {
		store.dispatch('filters/applyConfActivatedFilterSelected', confActivatedSelected);
	}

	applyDateFilter(dateFilterSelected: DateFilter): void {
		store.dispatch('filters/applyDateFilterSelected', dateFilterSelected);
	}

	get filters() {
		let filters: {
			values: EnvFilter[] | RunStatusFilter[] | ConfActivatedFilter[] | DateFilter[];
			selectedValue: EnvFilter | RunStatusFilter | ConfActivatedFilter | DateFilter;
			clickAction: Function;
		}[] = [
			{
				values: this.envFilters,
				selectedValue: this.envFilterSelected,
				clickAction: this.applyEnvFilter,
			},
		];

		if (this.type === RUNS)
			filters.push({
				values: this.runStatusFilters,
				selectedValue: this.runStatusFilterSelected,
				clickAction: this.applyRunStatusFilter,
			});

		if (this.type === CONFIGURATIONS)
			filters.push({
				values: this.confActivatedFilters,
				selectedValue: this.confActivatedFilterSelected,
				clickAction: this.applyConfActivatedFilter,
			});

		if (this.type === RUNS || this.type === STATUS)
			filters.push({
				values: this.dateFilters,
				selectedValue: this.dateFilterSelected,
				clickAction: this.applyDateFilter,
			});

		return filters;
	}
}
</script>
