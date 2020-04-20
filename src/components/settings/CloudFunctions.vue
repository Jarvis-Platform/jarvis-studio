<template>
	<v-container>
		<v-row>
			<v-col cols="12" offset="0">
				<v-card>
					<v-card-text>
						<vue-json-pretty
							:data="moduleJson"
							:deep="2"
							:show-double-quotes="true"
							:show-length="true"
							:show-line="false"
						>
						</vue-json-pretty>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VueJsonPretty from 'vue-json-pretty';

@Component({
	components: { VueJsonPretty }
})
export default class CloudFunctions extends Vue {
	mounted() {
		this.$store.dispatch('gcpCloudFunctions/fetchAndAdd');
	}

	get moduleJson() {
		return this.$store.state.gcpCloudFunctions.data;
	}
}
</script>
