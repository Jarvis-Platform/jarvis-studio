import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { getters } from './getters';
import { COLLECTION_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const accounts: IEasyFirestoreModule = {
	firestorePath: 'accounts',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'accounts',
	statePropName: STATE_PROP_NAME,
	sync: SYNC,
	getters,
};
