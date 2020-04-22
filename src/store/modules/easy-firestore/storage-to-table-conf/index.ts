import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { DOC_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const storageToTableConf: IEasyFirestoreModule = {
	firestorePath: 'mirror-exc-gcs-to-gbq-conf/{sourceId}/CONFIGURATION/{itemId}',
	firestoreRefType: DOC_REF,
	moduleName: 'storageToTableConf',
	statePropName: STATE_PROP_NAME,
	sync: SYNC,
};
