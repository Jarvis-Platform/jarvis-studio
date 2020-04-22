import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const getGbqToGbqConfArchive: IEasyFirestoreModule = {
	firestorePath: 'gbq-to-gbq-conf-archive/{id}/history',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'getGbqToGbqConfArchive',
	statePropName: STATE_PROP_NAME,
	sync: SYNC,
};
