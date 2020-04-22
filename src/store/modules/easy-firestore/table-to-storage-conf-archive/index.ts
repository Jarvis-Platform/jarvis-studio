import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const tableToStorageConfArchive: IEasyFirestoreModule = {
	firestorePath: 'table-to-storage-conf-archive/{id}/history',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'tableToStorageConfArchive',
	statePropName: STATE_PROP_NAME,
	sync: SYNC,
};
