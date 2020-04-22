import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const mirrorExcGcsToGbqRuns: IEasyFirestoreModule = {
	firestorePath: 'mirror-exc-gcs-to-gbq-runs',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'mirrorExcGcsToGbqRuns',
	statePropName: STATE_PROP_NAME,
	sync: SYNC,
};
