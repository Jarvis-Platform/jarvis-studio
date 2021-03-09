import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const tailerContextConfsArchive: IEasyFirestoreModule = {
	firestorePath: 'tailer-context-conf-archive/{id}/history',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'contextConfsArchive',
	statePropName: STATE_PROP_NAME,
	sync: SYNC,
};
