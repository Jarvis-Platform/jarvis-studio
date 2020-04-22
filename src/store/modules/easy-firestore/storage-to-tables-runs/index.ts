import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const storageToTablesRuns: IEasyFirestoreModule = {
	firestorePath: 'storage-to-tables-runs',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'storageToTablesRuns',
	statePropName: STATE_PROP_NAME,
	sync: SYNC,
};
