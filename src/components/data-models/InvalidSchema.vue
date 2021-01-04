<template>
	<v-container>
		<v-row>
			<v-col cols="12" offset="0">
				<v-card>
					<v-card-title>
						<span class="display-1 font-weight-bold">{{ this.jsonObject.id }}</span>

						<v-spacer />

						<v-chip color="red" text-color="white">{{ this.jsonObjectErrors.length + ' errors' }}</v-chip>
					</v-card-title>
				</v-card>
			</v-col>

			<v-col cols="12" offset="0">
				<v-card>
					<v-tabs v-model="activeTab" color="grey lighten-3" slider-color="primary">
						<v-tab ripple href="#jsonobject">Json Object</v-tab>
						<v-tab ripple href="#jsonobjecterrors">Json Errors</v-tab>
						<v-tab-item value="jsonobject">
							<v-card>
								<v-card-title>
									<span class="title">{{ this.jsonObject.id }}</span>
									<v-spacer />
								</v-card-title>

								<v-card-text>
									<vue-json-pretty
										:data="this.jsonObject"
										:deep="5"
										:show-double-quotes="true"
										:show-length="true"
										:show-line="false"
									>
									</vue-json-pretty>
								</v-card-text>
							</v-card>
						</v-tab-item>

						<v-tab-item value="jsonobjecterrors">
							<v-card>
								<v-card-title>
									<span class="title"> Json Schema Errors</span>
									<v-spacer />
								</v-card-title>

								<v-card-text>
									<vue-json-pretty
										:data="this.jsonObjectErrors"
										:deep="5"
										:show-double-quotes="true"
										:show-length="true"
										:show-line="false"
									>
									</vue-json-pretty>
								</v-card-text>
							</v-card>
						</v-tab-item>
					</v-tabs>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

@Component({
	components: { VueJsonPretty },
})
export default class InvalidSchema extends Vue {
	@Prop({ type: Object, required: true }) private jsonObject!: Object;
	@Prop({ type: Array, required: true }) private jsonObjectErrors!: [];

	activeTab: number | null = null;
}
</script>
