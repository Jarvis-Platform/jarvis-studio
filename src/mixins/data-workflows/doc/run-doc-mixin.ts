import { Component } from 'vue-property-decorator';
import { DataItem, DataWorkflowsType, OtherRunTab, RunDetailsTab, RunLogsTab, RunProps } from '@/types';
import DocMixin from '@/mixins/data-workflows/doc/doc-mixin';
import { RUNS } from '@/constants/data-workflows/status';

@Component
export default class RunDocMixin extends DocMixin {
	runDetailsData!: DataItem[];

	get type(): DataWorkflowsType {
		return RUNS;
	}

	get runProps(): RunProps {
		return {
			type: this.type!,
			tabsItems: this.itemTabsItems,
			isLoading: this.isLoading,
			isNotFound: this.isNotFound
		};
	}

	get itemTabsItems(): any {
		if (Object.keys(this.item).length === 0) return [];
		return [this.runDetailsTab, this.configurationTab, this.fullJSONTab, this.otherRunsTab, this.notesTab];
	}

	get runDetailsTab(): RunDetailsTab {
		return {
			label: 'Run Details',
			href: 'run-logs',
			component: {
				name: 'overview-component',
				props: {
					data: this.runDetailsData
				}
			}
		};
	}

	get runLogsTab(): RunLogsTab {
		return {
			label: 'Run Logs',
			href: 'run-details',
			component: {
				name: 'logs-component',
				props: {
					dagId: this.item.dag_id,
					dagRunId: this.item.dag_run_id,
					dagType: this.item.dag_type,
					dagExecutionDate: this.item.dag_execution_date
				}
			}
		};
	}

	get otherRunsTab(): OtherRunTab {
		return {
			label: 'Other runs',
			href: 'other-runs',
			component: {
				name: 'other-runs',
				props: {
					doc: this.item,
					moduleName: this.moduleName
				}
			}
		};
	}
}
