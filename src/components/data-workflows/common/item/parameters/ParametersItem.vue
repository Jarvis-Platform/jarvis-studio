<template>
	<v-row>
		<v-col cols="3">
			<span class="subheading">{{ paramItem.label }}:</span>

			<v-tooltip right v-if="paramItem.description">
				<template v-slot:activator="{ on }">
					<v-icon small color="blue-grey lighten-5" dark v-on="on">info</v-icon>
				</template>
				<span>{{ paramItem.description }}</span>
			</v-tooltip>
		</v-col>

		<v-col cols="9">
			<template v-if="paramItem.component">
				<component :is="paramItem.component" :properties="paramItem.properties" />
			</template>

			<template v-else>
				<span class="subheading font-weight-bold" v-if="paramItem.value">{{ paramItem.value }}</span>
				<span class="subheading font-weight-bold grey--text" v-else>{{ paramItem.default }}</span>
			</template>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AnyObject } from '@/types';
import SqlViewer from '@/components/data-workflows/common/item/overview/SqlViewer.vue';

@Component({
	components: { SqlViewer }
})
export default class ParametersItem extends Vue {
	@Prop({ type: Object, default: { id: 'account', label: 'Account', value: '000021' } }) paramItem!: AnyObject;
}
</script>
