import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, SYNC } from '@/constants/store/easy-firestore';

export const storageToStorageConfsArchive: IEasyFirestoreModule = {
	firestorePath: 'storage-to-storage-conf-archive/{id}/history',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'storageToStorageConfsArchive',
	statePropName: 'data',
	sync: SYNC,
};
