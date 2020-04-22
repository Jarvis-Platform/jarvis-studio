import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const workflowStatus: IEasyFirestoreModule = {
	firestorePath: 'workflow-status',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'workflowStatus',
	statePropName: STATE_PROP_NAME,
	sync: SYNC,
};
