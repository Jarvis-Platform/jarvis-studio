import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const vmLauncherConfArchive: IEasyFirestoreModule = {
	firestorePath: 'vm-launcher-conf-archive/{id}/history',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'vmLauncherConfArchive',
	statePropName: STATE_PROP_NAME,
	sync: SYNC,
};
