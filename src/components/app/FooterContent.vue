<template>
	<p class="caption mx-3 ma-0">
		&copy; {{ year }}, JARVIS by <a href="https://www.fashiondata.io/" target="_blank">Fashion Data</a>
	</p>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class FooterComponent extends Vue {
	get year() {
		return new Date().getFullYear();
	}
}
</script>
