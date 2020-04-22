<template>
	<v-container fluid>
		<v-col>
			<h2 class="black--text pb-3">
				{{ groupTitle }}

				<v-tooltip right v-if="tooltip">
					<template v-slot:activator="{ on }">
						<v-icon color="blue-grey lighten-5" dark v-on="on">info</v-icon>
					</template>

					<span>{{ description }}</span>
				</v-tooltip>
			</h2>

			<ParametersItem v-for="paramItem in paramItems" :paramItem="paramItem" :key="paramItem.id" />

			<footer>
				<slot name="footer" />
			</footer>
		</v-col>
	</v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ParametersItem from './ParametersItem.vue';

@Component({
	components: { ParametersItem },
})
export default class ParametersList extends Vue {
	@Prop({ type: String, required: true }) groupTitle!: string;
	@Prop(String) description?: string;
	@Prop({ type: Boolean, default: false }) tooltip!: boolean;
	@Prop({
		type: Array,
		default: [
			{ id: 'account', label: 'Account', value: '000020' },
			{ id: 'environment', label: 'Environment', value: 'PROD' },
		],
	})
	paramItems!: object;
}
</script>
