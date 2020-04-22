import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const mirrorExcGcsToGcsConfsArchive: IEasyFirestoreModule = {
	firestorePath: 'mirror-exc-gcs-to-gcs-conf-archive/{id}/history',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'mirrorExcGcsToGcsConfsArchive',
	statePropName: STATE_PROP_NAME,
	sync: SYNC,
};
