import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const tailerContextConfs: IEasyFirestoreModule = {
	firestorePath: 'tailer-context-conf',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'contextConfs',
	statePropName: STATE_PROP_NAME,
	sync: SYNC,
};
