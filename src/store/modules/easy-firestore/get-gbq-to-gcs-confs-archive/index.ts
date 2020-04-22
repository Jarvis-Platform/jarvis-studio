import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const getGbqToGcsConfsArchive: IEasyFirestoreModule = {
	firestorePath: 'gbq-to-gcs-conf-archive/{id}/history',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'getGbqToGcsConfsArchive',
	statePropName: STATE_PROP_NAME,
	sync: SYNC,
};
