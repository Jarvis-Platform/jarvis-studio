<template>
	<v-container
		class="note-item transition-ease-in-out"
		:class="{ 'grey lighten-3': isFocused || isParentNote }"
		@mouseenter="isHovering = true"
		@mouseleave="isHovering = false"
	>
		<div class="d-flex align-center">
			<avatar-component class="mr-2" :user="{ email: note.userEmail, photoURL: note.userPhotoURL }" />
			<span class="mr-2 font-weight-bold">{{ note.userDisplayName }}</span>
			<span class="mr-2">{{ getFormattedTimestamp(note.created_at) }}</span>
			<span v-if="note.updated_at" class="mr-2">(edited {{ getFormattedTimestamp(note.updated_at) }})</span>

			<v-spacer />

			<div v-if="showActions" class="actions pa-2 grey lighten-2">
				<v-btn x-small class="mr-2" @click="toggleIsEditing">
					<v-icon x-small>mdi-pencil</v-icon>
				</v-btn>

				<v-btn v-if="showThreadAction" x-small class="mr-2" @click="openThread">
					<v-icon x-small>mdi-message-text</v-icon>
				</v-btn>

				<v-btn :loading="isDeleting" x-small color="error" @click="deleteNote">
					<v-icon x-small>mdi-delete</v-icon>
				</v-btn>
			</div>
		</div>

		<note-editor
			v-if="isEditing"
			:default-text="note.text"
			:is-editing="isEditing"
			:is-loading="isEditorLoading"
			@onValidated="editNote"
		/>

		<div v-else class="ml-11 text" v-html="note.text"></div>

		<slot name="thread-information" />
	</v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter, State } from 'vuex-class';
import { Note, User } from '@/types';
import { notes as notesModule } from '@/store/modules/easy-firestore/notes';
import { oneDayLimit } from '@/util/dates';
import AvatarComponent from '@/components/common/AvatarComponent.vue';
import NoteEditor from './editor/NoteEditor.vue';

@Component({
	components: { AvatarComponent, NoteEditor }
})
export default class NoteItem extends Vue {
	@Prop({ type: Object, required: true }) note!: Note;
	@Prop({ type: String, required: true }) moduleName!: string;
	@Prop({ type: String, required: true }) relatedDocId!: string;
	@Prop(Boolean) isThreadNote?: boolean;

	@State(state => state.notes.parentNote) parentNote!: Note;
	@State(state => state.notes.threadNotes) threadNotes!: Note[];
	@State(state => state.notes.showThreadPanel) showThreadPanel!: boolean;

	@Getter('user/user') user!: User;

	isHovering: boolean = false;
	isEditorLoading: boolean = false;
	isEditing: boolean = false;
	isDeleting: boolean = false;

	toggleIsEditing() {
		this.isEditing = !this.isEditing;
	}

	openThread() {
		this.$emit('openThread');
	}

	editNote(text: string) {
		this.isEditorLoading = true;
		this.$store
			.dispatch(`${notesModule.moduleName}/patch`, {
				id: this.note.id,
				text
			})
			.then(() => {
				this.isEditorLoading = false;
				this.toggleIsEditing();
			})
			.catch(err => {
				console.error(err);
				this.isEditorLoading = false;
			});
	}

	deleteNote() {
		this.isDeleting = true;

		if (this.threadNotes.length === 0 && this.showThreadPanel && this.parentNote.id === this.note.id)
			this.$store.commit('notes/CLOSE_THREAD_PANEL');

		this.$store
			.dispatch(`${notesModule.moduleName}/delete`, this.note.id)
			.then(() => {
				this.isDeleting = false;
			})
			.catch(err => {
				console.log(err);
			});
	}

	getFormattedTimestamp(timestamp: string) {
		return oneDayLimit(timestamp);
	}

	get isFocused(): boolean {
		return this.isEditing || this.isHovering;
	}

	get showActions(): boolean {
		return this.isFocused && this.user.uid === this.note.created_by && !this.isParentNote;
	}

	get showThreadAction(): boolean {
		return !this.isThreadNote && this.isFocused;
	}

	get isParentNote(): boolean {
		return this.note.id === this.parentNote.id;
	}
}
</script>

<style lang="scss">
.note-item {
	position: relative;

	.actions {
		position: absolute;
		top: 0;
		right: 10px;
		transform: translateY(-50%);
		border-radius: 4px;
	}

	.text {
		p {
			margin: 0;
		}
	}
}
</style>
