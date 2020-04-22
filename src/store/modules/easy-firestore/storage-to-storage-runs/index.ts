import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const storageToStorageRuns: IEasyFirestoreModule = {
	firestorePath: 'storage-to-storage-runs',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'storageToStorageRuns',
	statePropName: STATE_PROP_NAME,
	sync: SYNC,
};
