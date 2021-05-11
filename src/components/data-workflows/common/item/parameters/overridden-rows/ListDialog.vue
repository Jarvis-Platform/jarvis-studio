<template>
	<v-dialog v-model="isListDialogVisible" width="420">
		<template v-slot:activator="{ on, attrs }">
			<p v-on="on" v-bind="attrs" class="text-decoration-underline">{{ buttonLabel[index] }}</p>
		</template>

		<v-card class="mx-auto" tile>
			<v-card-title>Filters</v-card-title>

			<v-list-item v-for="listItem in list[index]" :key="listItem" class="px-6">
				<v-list-item-content>
					<v-list-item-title>{{ listItem }}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TruncatedDisplayValue extends Vue {
	@Prop({ type: Array, required: true }) buttonLabel!: string;
	@Prop({ type: Array, required: true }) list!: string[];
	@Prop({ type: Number, required: true }) index!: number;

	isListDialogVisible = false;
}
</script>
