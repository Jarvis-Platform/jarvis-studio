import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const vmLauncherRuns: IEasyFirestoreModule = {
	firestorePath: 'vm-launcher-runs',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'vmLauncherRuns',
	statePropName: STATE_PROP_NAME,
	sync: SYNC,
};
