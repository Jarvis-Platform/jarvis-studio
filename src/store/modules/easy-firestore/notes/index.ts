import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { Note, NotesState } from '@/types';
import { COLLECTION_REF, STATE_PROP_NAME } from '@/constants/store/easy-firestore';

export const notes: IEasyFirestoreModule = {
	firestorePath: 'notes',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'notes',
	statePropName: STATE_PROP_NAME,
	state: {
		parentNote: {},
		threadNotes: [],
		showThreadPanel: false,
	},
	mutations: {
		OPEN_THREAD_PANEL(state: NotesState, { parentNote, threadNotes }: { parentNote: Note; threadNotes: Note[] }) {
			state.parentNote = parentNote;
			state.threadNotes = threadNotes;
			state.showThreadPanel = true;
		},
		CLOSE_THREAD_PANEL(state: NotesState) {
			state.showThreadPanel = false;
			state.parentNote = {};
			state.threadNotes = [];
		},
		PUSH_NOTE_TO_THREAD(state: NotesState, note: Note) {
			state.threadNotes = [...state.threadNotes!, note];
		},
		REMOVE_NOTE_FROM_THREAD(state: NotesState, id: string) {
			state.threadNotes = state.threadNotes!.filter((note: Note) => note.id !== id);
		},
	},
	sync: {
		orderBy: ['created_at'],
		insertHook: function (updateStore, doc, store) {
			// const user = store.getters['user/user'];
			//
			// doc.user.displayName = user.displayName;
			// doc.user.photoURL = user.photoURL;
			// doc.user.email = user.email;

			if (doc.isThreadNote) store.commit('notes/PUSH_NOTE_TO_THREAD', doc);
			updateStore(doc);
		},
		deleteHook: function (updateStore, id, store) {
			// TODO: Add thread note verif

			store.commit('notes/REMOVE_NOTE_FROM_THREAD', id);
			updateStore(id);
		},
	},
	serverChange: {
		// addedHook: function(updateStore, note) {
		// 	note.user.get().then((res: any) => {
		// 		note.user = res.data();
		// 		updateStore(note);
		// 	});
		// },
		// modifiedHook: function(updateStore, note) {
		// 	note.user.get().then((res: any) => {
		// 		note.user = res.data();
		// 		updateStore(note);
		// 	});
		// },
		convertTimestamps: {
			created_at: '%convertTimestamp%',
			updated_at: '%convertTimestamp%',
		},
	},
};
