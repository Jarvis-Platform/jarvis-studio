<template>
	<v-toolbar dense tabs color="primary" dark>
		<v-toolbar-title class="pl-2 display-1">{{ title }}</v-toolbar-title>

		<template v-slot:extension>
			<v-breadcrumbs :items="tableItems" large>
				<v-breadcrumbs-item slot="item" slot-scope="{ item }" exact :to="item.to" class="item">
					{{ item.text }}
				</v-breadcrumbs-item>

				<template v-slot:divider>
					<v-icon>chevron_right</v-icon>
				</template>
			</v-breadcrumbs>
		</template>
	</v-toolbar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DataModelHeader extends Vue {
	@Prop({ default: 'Data model', type: String }) private title!: [];
	@Prop({ type: Array, required: true }) private tableItems!: [];
}
</script>

<style lang="scss">
// TODO: Remove
.item a {
	color: white;
}
</style>
