<template>
	<div>
		<v-icon v-if="directExecution" color="success">mdi-rocket</v-icon>
		<v-icon v-else color="error">mdi-tortoise</v-icon>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DirectExecutionIcon extends Vue {
	@Prop({ type: Boolean }) directExecution?: boolean;
}
</script>
