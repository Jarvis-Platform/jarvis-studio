<template>
	<div class="notes-container">
		<div ref="notesThread" class="notes-wrapper">
			<v-toolbar dense flat class="mb-4 thread-toolbar" absolute>
				<v-toolbar-title>
					<span class="font-weight-bold">Thread</span> - {{ parentNote.userDisplayName }}
				</v-toolbar-title>

				<v-spacer></v-spacer>

				<v-btn icon @click="closeThread">
					<v-icon>mdi-close</v-icon>
				</v-btn>
			</v-toolbar>

			<div class="pt-10">
				<note-item :note="parentNote" :module-name="moduleName" :related-doc-id="relatedDocId" is-thread-note />

				<template v-if="threadNotes.length > 0">
					<v-container>
						<p class="counter font-weight-bold">
							{{ threadNotes.length }} {{ threadNotes.length === 1 ? 'answer' : 'answers' }}
						</p>
					</v-container>

					<note-item
						v-for="note in threadNotes"
						:key="note.id"
						:note="note"
						:module-name="moduleName"
						:related-doc-id="relatedDocId"
						is-thread-note
					/>
				</template>
			</div>
		</div>

		<note-editor :isLoading="isEditorLoading" @onValidated="onValidated" />
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { Note } from '@/types';
import { State } from 'vuex-class';

import NotesMixin from '../notes-mixin';

@Component
export default class NoteThread extends Mixins(NotesMixin) {
	@State((state) => state.notes.parentNote) parentNote!: Note;
	@State((state) => state.notes.threadNotes) threadNotes!: Note[];

	closeThread() {
		this.$store.commit('notes/CLOSE_THREAD_PANEL');
	}

	onValidated(text: string) {
		this.insertNote(text, this.$refs.notesThread);
	}

	get insertData() {
		return {
			account: this.account,
			isThreadNote: true,
			moduleName: this.moduleName,
			relatedDocId: this.relatedDocId,
			routeName: this.$route.name,
			parentNoteId: this.parentNote.id,
			userId: this.user.uid,
			userEmail: this.user.email,
			userPhotoURL: this.user.photoURL,
			userDisplayName: this.user.displayName,
		};
	}
}
</script>

<style lang="scss" scoped>
@import 'src/scss/components/notes';

.thread-toolbar {
	width: 41.6%;
	border-bottom: 1px solid lightgrey;
}

.counter {
	position: relative;

	&:after {
		content: '';
		position: absolute;
		top: 50%;
		right: 0;
		width: 72%;
		height: 1px;
		background-color: lightgrey;
	}
}
</style>
