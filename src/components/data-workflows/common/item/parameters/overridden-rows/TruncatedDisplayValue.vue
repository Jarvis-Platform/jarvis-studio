<template>
	<div>
		<v-dialog v-if="hasToBeTruncated" v-model="isTruncatedDialogVisible" width="75%">
			<template v-slot:activator="{ on, attrs }">
				{{ truncatedDisplayValue }}
				<v-btn v-on="on" v-bind="attrs" x-small color="secondary" icon>
					<v-icon>mdi-dots-horizontal-circle-outline</v-icon>
				</v-btn>
			</template>

			<v-card>
				<v-card-title class="headline grey lighten-2">{{ parameters[index].name }}</v-card-title>

				<v-card-text>
					<vue-json-pretty :data="displayValue" :show-double-quotes="true" :show-length="true" :show-line="false" />
				</v-card-text>

				<v-divider />

				<v-card-actions>
					<v-spacer />
					<v-btn color="primary" text @click="isTruncatedDialogVisible = false">Close</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<p v-else>{{ displayValue }}</p>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import VueJsonPretty from 'vue-json-pretty';

import 'vue-json-pretty/lib/styles.css';

@Component({
	components: { VueJsonPretty },
})
export default class TruncatedDisplayValue extends Vue {
	@Prop({ type: [String, Object], required: true }) displayValue!: string | object;
	@Prop({ type: Number, required: true }) index!: number;
	@Prop({ type: Array, required: true }) parameters!: object[];

	isTruncatedDialogVisible = false;

	get formattedDisplayValue() {
		return typeof this.displayValue === 'string' ? this.displayValue : JSON.stringify(this.displayValue);
	}

	get hasToBeTruncated() {
		return this.formattedDisplayValue.length > 50;
	}

	get truncatedDisplayValue() {
		return `${this.formattedDisplayValue.substr(0, 50)}...`;
	}
}
</script>
