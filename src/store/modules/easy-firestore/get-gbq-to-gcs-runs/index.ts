import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const getGbqToGcsRuns: IEasyFirestoreModule = {
	firestorePath: 'gbq-to-gcs-runs',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'getGbqToGcsRuns',
	statePropName: STATE_PROP_NAME,
	sync: SYNC,
};
