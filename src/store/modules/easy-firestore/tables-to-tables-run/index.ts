import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { DOC_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const tablesToTablesRun: IEasyFirestoreModule = {
	firestorePath: 'gbq-to-gbq-runs/{itemId}',
	firestoreRefType: DOC_REF,
	moduleName: 'tablesToTablesRun',
	statePropName: STATE_PROP_NAME,
	sync: SYNC,
};
