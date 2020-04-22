import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const getGbqToGbqRuns: IEasyFirestoreModule = {
	firestorePath: 'gbq-to-gbq-runs',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'getGbqToGbqRuns',
	statePropName: STATE_PROP_NAME,
	sync: SYNC,
};
