<template>
	<div>
		<v-toolbar dense tabs color="primary">
			<v-toolbar-title class="pl-2 display-1">Cloud Function Configurations</v-toolbar-title>
		</v-toolbar>

		<cloud-functions-content />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CloudFunctionsContent from '@/components/settings/CloudFunctions.vue';

@Component({
	components: { CloudFunctionsContent },
})
export default class CloudFunctions extends Vue {}
</script>
