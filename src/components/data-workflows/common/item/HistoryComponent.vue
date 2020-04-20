<template>
	<div class="d-flex justify-center align-center fill-height">
		<div class="d-flex flex-column text-right body-2">
			<span class="text--secondary">{{ email ? email : 'No email' }}</span>

			<v-menu v-model="showMenu" transition="slide-y-transition" offset-y>
				<template v-slot:activator="{ on }">
					<span
						v-on="on"
						class="cta"
						:class="{ 'red--text': isUpdated, 'font-weight-bold': isUpdated }"
						@click="fetchArchivedConfs"
					>
						{{ updatedDate | moment('YYYY/MM/DD - HH:mm:ss') }}
					</span>
				</template>

				<v-list max-height="40vh">
					<v-list-item v-if="isLoading" class="d-flex justify-center">
						<v-progress-circular indeterminate size="32" color="primary" />
					</v-list-item>

					<template v-else-if="Object.keys(archivedConfigurations).length > 0">
						<v-list-item @click="resetConfiguration">
							<v-list-item-title>Current Configuration</v-list-item-title>
						</v-list-item>

						<v-list-item
							v-for="configuration in archivedConfigurations"
							:key="getItemTitle(configuration)"
							@click="applyConfiguration(configuration)"
						>
							<v-list-item-title>{{ getItemTitle(configuration) | moment('YYYY/MM/DD - HH:mm:ss') }}</v-list-item-title>
						</v-list-item>
					</template>

					<v-list-item v-else>
						<v-list-item-title>No configuration history.</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
		</div>

		<avatar-component :user="{ email }" class="mx-2" />
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Configuration } from '@/types';
import { mapState } from 'vuex';
import AvatarComponent from '@/components/common/AvatarComponent.vue';
import store from '@/store';

@Component({
	components: { AvatarComponent },
	computed: {
		...mapState({
			archivedConfigurations(state: any) {
				return state[this.archivedConfsModuleName].data;
			}
		})
	}
})
export default class HistoryComponent extends Vue {
	@Prop({ required: true }) moduleName!: string;
	@Prop({ required: true }) archivedConfsModuleName!: string;
	@Prop({ required: true }) docId!: string;
	@Prop({ required: true }) email!: string;
	@Prop({ required: true, default: 'No updated date' }) updatedDate!: string;

	showMenu: boolean = false;
	isLoading: boolean = false;
	isFetched: boolean = false;
	isUpdated: boolean = false;

	fetchArchivedConfs() {
		if (this.isFetched) return;

		this.isLoading = true;

		this.$store.dispatch(`${this.archivedConfsModuleName}/closeDBChannel`, { clearModule: true });
		this.$store.dispatch(`${this.archivedConfsModuleName}/fetchAndAdd`, { id: this.docId }).then(() => {
			this.isLoading = false;
			this.isFetched = true;
		});
	}

	getItemTitle(configuration: Configuration): string {
		return configuration.update_date || configuration.updated_date;
	}

	applyConfiguration(configuration: Configuration) {
		this.$store.commit(`${this.moduleName}/UPDATE_DOCUMENT_LOCALLY`, { id: this.docId, newDoc: configuration });
		this.isUpdated = true;
	}

	resetConfiguration() {
		this.isUpdated = false;
		store.dispatch(`${this.moduleName}/closeDBChannel`, { clearModule: true });
		store.dispatch(`${this.moduleName}/fetchById`, this.docId);
	}
}
</script>
