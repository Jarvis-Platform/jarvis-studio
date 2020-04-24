import { Component, Prop, Vue } from 'vue-property-decorator';
import { AnyObject, User } from '@/types';
import { Getter } from 'vuex-class';
import { firebase } from '@/plugins/firebase';
import { notes as notesModule } from '@/store/modules/easy-firestore/notes';
import { users } from '@/store/modules/easy-firestore/users';

import NoteEditor from './editor/NoteEditor.vue';
import NoteItem from './NoteItem.vue';

@Component({
	components: { NoteEditor, NoteItem },
})
export default class NotesMixin extends Vue {
	@Prop({ type: String, required: true }) moduleName!: string;
	@Prop({ type: String, required: true }) relatedDocId!: string;
	@Prop({ type: String, required: true }) account!: string;

	@Getter('user/user') user!: User;

	isEditorLoading: boolean = false;

	insertNote(text: string, ref: any) {
		if (Object.keys(this.insertData).length === 0) throw new Error('You must provide inserData');

		this.isEditorLoading = true;

		this.$store
			.dispatch(`${notesModule.moduleName}/insert`, { ...this.insertData, text })
			.then(() => {
				this.isEditorLoading = false;
				ref.scrollTop = ref.scrollHeight;
			})
			.catch(() => {
				this.isEditorLoading = false;
			});
	}

	get insertData(): AnyObject {
		return {};
	}

	get userRef() {
		return firebase.firestore().collection(users.firestorePath).doc(this.user.uid);
	}
}
