import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const gbqToGbqTasksStatus: IEasyFirestoreModule = {
	firestorePath: 'gbq-to-gbq-tasks-status',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'gbqToGbqTasksStatus',
	statePropName: STATE_PROP_NAME,
	sync: SYNC,
};
