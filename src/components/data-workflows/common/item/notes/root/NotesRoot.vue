<template>
	<div class="notes-container">
		<v-progress-circular v-if="isLoading" class="d-flex mx-auto my-0" indeterminate size="42" color="primary" />
		<div v-else-if="Object.keys(parentNotes).length > 0" ref="notesRoot" class="notes-wrapper">
			<note-item
				v-for="parentNote in parentNotes"
				:key="parentNote.id"
				:note="parentNote"
				:module-name="moduleName"
				:related-doc-id="relatedDocId"
				@openThread="openThread(parentNote)"
			>
				<template #thread-information>
					<div
						v-if="getThreadNotes(parentNote.id).length > 0"
						class="d-flex align-center ml-8 mt-2 px-2 py-3 thread-information cursor--pointer"
						@click="openThread(parentNote)"
					>
						<avatar-component
							v-for="(note, index) in getInvolvedUsers(parentNote)"
							:key="`${note.id}-${index}`"
							:user="{ email: note.userEmail, photoURL: note.userPhotoURL }"
							size="x-small"
							class="mr-1"
						/>

						<div>
							<span class="ml-2 font-weight-bold">
								{{ getThreadNotes(parentNote.id).length }}
								{{ getThreadNotes(parentNote.id).length === 1 ? 'answer' : 'answers' }}
							</span>
							<span class="font-italic">
								Last answer:
								{{ getFormatedTimestamp(getThreadNotes(parentNote.id)) }}
							</span>
						</div>
					</div>
				</template>
			</note-item>
		</div>

		<v-container v-else class="ml-1 mt-3">
			<p>Any note for the moment.</p>
		</v-container>

		<note-editor :isLoading="isEditorLoading" @onValidated="onValidated" />
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { Note } from '@/types';
import { State } from 'vuex-class';
import { notes as notesModule } from '@/store/modules/easy-firestore/notes';
import { oneDayLimit } from '@/util/dates';

import NotesMixin from '../notes-mixin';
import AvatarComponent from '@/components/common/AvatarComponent.vue';

@Component({
	components: { AvatarComponent }
})
export default class NotesRoot extends Mixins(NotesMixin) {
	@State(state => state.notes.data) notes!: Note[];
	@State(state => state.notes.parentNote) parentNote!: Note;

	isLoading: boolean = true;

	mounted() {
		this.fetchNotes();
	}

	activated() {
		this.fetchNotes();
	}

	fetchNotes() {
		if (!this.where) throw new Error('You must provide a where getter.');

		this.$store.dispatch(`${notesModule.moduleName}/closeDBChannel`, { clearModule: true });
		this.$store.dispatch(`${notesModule.moduleName}/openDBChannel`, { where: this.where });
		this.$store.dispatch(`${notesModule.moduleName}/fetchAndAdd`, { where: this.where }).then(() => {
			this.isLoading = false;
		});
	}

	openThread(parentNote: Note) {
		this.parentNote.id === parentNote.id
			? this.$store.commit('notes/CLOSE_THREAD_PANEL')
			: this.$store.commit('notes/OPEN_THREAD_PANEL', { parentNote, threadNotes: this.getThreadNotes(parentNote.id) });
	}

	getThreadNotes(parentNoteId: string) {
		return Object.values(this.notes).filter((note: Note) => note.parentNoteId === parentNoteId);
	}

	getInvolvedUsers(parentNote: Note) {
		const users = this.getThreadNotes(parentNote.id);

		return users.filter((obj, pos, arr) => {
			return arr.map(mapObj => mapObj.userId).indexOf(obj.userId) === pos;
		});
	}

	getFormatedTimestamp(threadNotes: Note[]) {
		const timestamp = threadNotes[threadNotes.length - 1].updated_at || threadNotes[threadNotes.length - 1].created_at;
		return oneDayLimit(timestamp);
	}

	onValidated(text: string) {
		this.insertNote(text, this.$refs.notesRoot);
	}

	get where() {
		return [
			['moduleName', '==', this.moduleName],
			['relatedDocId', '==', this.relatedDocId]
		];
	}

	get parentNotes() {
		return Object.values(this.notes).filter((note: Note) => note.created_by === this.user.uid && !note.isThreadNote);
	}

	get insertData() {
		return {
			account: this.account,
			isThreadNote: false,
			moduleName: this.moduleName,
			relatedDocId: this.relatedDocId,
			routeName: this.$route.name,
			userId: this.user.uid,
			userEmail: this.user.email,
			userPhotoURL: this.user.photoURL,
			userDisplayName: this.user.displayName
		};
	}
}
</script>

<style lang="scss">
@import 'src/scss/components/notes';

.thread-information {
	border: 1px solid transparent;
	border-radius: 4px;
	transition: background-color $default-animation-duration ease;

	&:hover {
		background-color: lightgrey;
	}
}
</style>
