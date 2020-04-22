import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { DOC_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const storageToTableRun: IEasyFirestoreModule = {
	firestorePath: 'mirror-exc-gcs-to-gbq-runs/{itemId}',
	firestoreRefType: DOC_REF,
	moduleName: 'storageToTableRun',
	statePropName: STATE_PROP_NAME,
	sync: SYNC,
};
