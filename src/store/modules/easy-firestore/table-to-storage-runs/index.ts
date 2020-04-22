import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const tableToStorageRuns: IEasyFirestoreModule = {
	firestorePath: 'table-to-storage-runs',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'tableToStorageRuns',
	statePropName: STATE_PROP_NAME,
	sync: SYNC,
};
