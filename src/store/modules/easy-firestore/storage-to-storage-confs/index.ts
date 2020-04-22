import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, SYNC } from '@/constants/store/easy-firestore';
import { UPDATE_DOCUMENT_LOCALLY } from '@/store/modules/easy-firestore/_common/mutations';

export const storageToStorageConfs: IEasyFirestoreModule = {
	firestorePath: 'storage-to-storage-conf',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'storageToStorageConfs',
	statePropName: 'data',
	sync: SYNC,
	mutations: { UPDATE_DOCUMENT_LOCALLY },
};
