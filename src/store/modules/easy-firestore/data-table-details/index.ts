import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { DOC_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const dataTableDetails: IEasyFirestoreModule = {
	firestorePath: 'gbq-table-preview/{projectId}/{datasetId}/{tableId}',
	firestoreRefType: DOC_REF,
	moduleName: 'dataTableDetails',
	statePropName: STATE_PROP_NAME,
	sync: SYNC,
};
