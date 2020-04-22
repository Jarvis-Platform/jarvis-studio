<template>
	<div>
		<v-container class="ma-0 pt-0">
			<v-row>
				<v-col :cols="showThreadPanel ? 7 : 12" class="pa-0" :class="{ 'bordered-col': showThreadPanel }">
					<notes-root v-bind="defaultProps" />
				</v-col>

				<transition name="fade">
					<v-col v-if="showThreadPanel" cols="5" class="pa-0">
						<note-thread v-bind="defaultProps" />
					</v-col>
				</transition>
			</v-row>
		</v-container>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';

import NotesRoot from './root/NotesRoot.vue';
import NoteThread from './thread/NoteThread.vue';

interface DefaultProps {
	moduleName: string;
	relatedDocId: string;
	account: string;
}

@Component({
	components: { NotesRoot, NoteThread },
})
export default class NotesTab extends Vue {
	@Prop({ type: String, required: true }) account!: string;
	@Prop({ type: String, required: true }) moduleName!: string;
	@Prop({ type: String, required: true }) relatedDocId!: string;

	@State((state) => state.notes.showThreadPanel) showThreadPanel!: boolean;

	get defaultProps(): DefaultProps {
		return {
			moduleName: this.moduleName,
			relatedDocId: this.relatedDocId,
			account: this.account,
		};
	}
}
</script>

<style lang="scss">
.bordered-col {
	position: relative;

	&::before {
		content: '';
		z-index: 10;
		position: absolute;
		top: 0;
		right: 0;
		width: 1px;
		height: calc(100% + 12px);
		background-color: lightgrey;
	}
}
</style>
