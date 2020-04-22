import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const connectionsHistory: IEasyFirestoreModule = {
	firestorePath: 'users/{userId}/connections-history',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'connectionsHistory',
	statePropName: STATE_PROP_NAME,
	sync: SYNC,
};
