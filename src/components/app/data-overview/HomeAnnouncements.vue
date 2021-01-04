<template>
	<v-container fluid>
		<v-row>
			<v-col cols="6" offset="3">
				<v-card elevation="0">
					<v-card-text max-width="374">
						<AnnounceKit embedWidget:="true" floatWidget:="true" widget="https://announcekit.app/widgets/v2/3WakrS" />
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AnnounceKit from 'announcekit-vue';

@Component({
	components: { AnnounceKit },
})
export default class HomeAnnouncements extends Vue {
	mounted() {}
}
</script>
