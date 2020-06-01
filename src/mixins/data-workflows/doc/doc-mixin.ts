/**
 * To use this mixin, parent component has to define `moduleName` & `type` in data.
 * It will fetch module name information depending url `id` parameter.
 */

import { Component, Vue, Watch } from 'vue-property-decorator';
import { AnyObject, ConfigurationTab, DataItem, DataWorkflowsType, FullJSONTab, NotesTab } from '@/types';
import { IPluginState } from 'vuex-easy-firestore/types/declarations';
import DataManagementHeader from '@/components/data-workflows/common/DataManagementHeader.vue';
import ItemComponent from '@/components/data-workflows/common/item/ItemComponent.vue';
import store from '@/store';
import { mapState } from 'vuex';

@Component({
	components: { DataManagementHeader, ItemComponent },
	computed: {
		...mapState({
			firestoreItem(state: any) {
				return state[this.moduleName].data;
			},
		}),
	},
})
export default class DocMixin extends Vue {
	private firestoreItem: any;
	archivedConfsModuleName: any;
	itemTabsItems: any;
	configurationData!: DataItem[];

	// TODO: See if this watch decorator is removable
	@Watch('firestoreItem')
	onFirestoreItemChanged(val: IPluginState) {
		const item = val[this.itemId];
		if (item) this.item = item;
	}

	moduleName: string = ''; // Overridden by component
	isNotFound: boolean = false;
	item: AnyObject = {};
	isLoading: boolean = true;

	mounted() {
		if (!this.moduleName) throw new Error('Parent component has to define `moduleName` in data');
		if (!this.type) throw new Error('Parent component has to define `type` in computed');
		this.getItem();
	}

	async getItem() {
		if (!this.firestoreItem[this.itemId]) await this.getFirestoreData();
		this.item = this.firestoreItem[this.itemId];

		if (!this.item) this.isNotFound = true;
		this.isLoading = false;
	}

	async getFirestoreData() {
		await store.dispatch(`${this.moduleName}/closeDBChannel`, { clearModule: true });
		await store.dispatch(`${this.moduleName}/fetchById`, this.itemId);
	}

	get itemId(): string {
		return this.$route.params.id ? this.$route.params.id : ' ';
	}

	// Overridden by component
	get type(): DataWorkflowsType {
		return null;
	}

	get configurationTab(): ConfigurationTab {
		return {
			label: 'Configuration',
			href: 'configuration',
			component: {
				name: 'overview-component',
				props: {
					data: this.configurationData,
				},
			},
		};
	}

	get fullJSONTab(): FullJSONTab {
		return {
			label: 'Full Json',
			href: 'full-json',
			component: {
				name: 'view-json',
				props: {
					json: this.item,
					jsonId: this.itemId,
				},
			},
		};
	}

	get notesTab(): NotesTab {
		return {
			label: 'Notes',
			href: 'notes',
			component: {
				name: 'notes-tab',
				props: {
					account: this.item.account,
					moduleName: this.moduleName,
					relatedDocId: this.item.id,
				},
			},
		};
	}
}
