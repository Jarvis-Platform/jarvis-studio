import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const storageToTablesConfArchive: IEasyFirestoreModule = {
	firestorePath: 'storage-to-tables-conf-archive/{id}/history',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'storageToTablesConfArchive',
	statePropName: STATE_PROP_NAME,
	sync: SYNC,
};
