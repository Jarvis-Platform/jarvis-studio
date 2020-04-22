import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const mirrorExcGcsToGcsRuns: IEasyFirestoreModule = {
	firestorePath: 'mirror-exc-gcs-to-gcs-runs',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'mirrorExcGcsToGcsRuns',
	statePropName: STATE_PROP_NAME,
	sync: SYNC,
};
