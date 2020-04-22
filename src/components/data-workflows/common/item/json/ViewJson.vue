<template>
	<v-container>
		<v-row class="pl-5 pt-4 pr-5">
			<v-col cols="12" offset="0">
				<span v-if="jsonId" class="headline font-weight-bold">{{ jsonId }}</span>

				<v-row class="pt-4 pb-4">
					<vue-json-pretty
						class="json-pretty"
						:data="json"
						:deep="deep"
						:show-double-quotes="true"
						:show-length="true"
						:show-line="false"
					/>
				</v-row>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AnyObject } from '@/types';
import VueJsonPretty from 'vue-json-pretty';

@Component({
	components: { VueJsonPretty },
})
export default class ViewJSON extends Vue {
	@Prop({ type: Object, required: true }) json!: AnyObject;
	@Prop({ type: Number, default: 5 }) deep!: number;
	@Prop(String) jsonId?: string;
}
</script>

<style lang="scss" scoped>
.json-pretty {
	word-break: break-all;
}
</style>
