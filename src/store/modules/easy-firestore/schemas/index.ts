import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const schemas: IEasyFirestoreModule = {
	firestorePath: 'schemas',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'schemas',
	statePropName: STATE_PROP_NAME,
	sync: SYNC,
};
