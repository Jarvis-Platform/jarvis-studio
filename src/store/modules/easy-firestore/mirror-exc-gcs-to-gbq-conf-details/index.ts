import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const mirrorExcGcsToGbqConfDetails: IEasyFirestoreModule = {
	firestorePath: 'mirror-exc-gcs-to-gbq-conf/{bucketId}/CONFIGURATION',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'mirrorExcGcsToGbqConfDetails',
	statePropName: STATE_PROP_NAME,
	sync: SYNC,
};
