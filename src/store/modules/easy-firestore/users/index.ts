import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const users: IEasyFirestoreModule = {
	firestorePath: 'users',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'users',
	statePropName: STATE_PROP_NAME,
	sync: SYNC,
};
