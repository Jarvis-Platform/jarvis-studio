import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const dataModels: IEasyFirestoreModule = {
	firestorePath: 'gbq-table-preview',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'dataModels',
	statePropName: STATE_PROP_NAME,
	sync: SYNC,
};
