import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const dataTables: IEasyFirestoreModule = {
	firestorePath: 'gbq-table-preview/{projectId}/{datasetId}',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'dataTables',
	statePropName: STATE_PROP_NAME,
	sync: SYNC,
};
