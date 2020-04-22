<template>
	<v-row align="center" justify="end">
		<v-btn icon @click.native="searchBegin">
			<v-icon>search</v-icon>
		</v-btn>

		<div class="searching" :class="{ 'mr-2': searching, 'searching--closed': !searching }">
			<v-text-field
				ref="search"
				v-model="search"
				append-icon="close"
				label="Search"
				hide-details
				single-line
				color="white"
				@click:append="clearSearch"
				@blur="clearSearch"
			/>
		</div>
	</v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SearchMenu extends Vue {
	searching: boolean = false;
	search: string = '';

	searchBegin() {
		this.searching = true;
		setTimeout(() => (this.$refs.search as HTMLInputElement).focus(), 200);
	}

	clearSearch() {
		this.searching = false;
		this.search = '';
	}
}
</script>

<style scoped lang="scss">
@import '../../../../../node_modules/vuetify/src/components/VBtn/variables';

.searching {
	width: 208px;
	transition: $primary-transition;
}
.searching--closed {
	width: 0;

	& > * {
		display: none;
	}
}
</style>
