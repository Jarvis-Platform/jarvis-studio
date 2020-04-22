import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';
import { UPDATE_DOCUMENT_LOCALLY } from '@/store/modules/easy-firestore/_common/mutations';

export const getGbqToGcsConfs: IEasyFirestoreModule = {
	firestorePath: 'gbq-to-gcs-conf',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'getGbqToGcsConfs',
	statePropName: STATE_PROP_NAME,
	sync: SYNC,
	mutations: { UPDATE_DOCUMENT_LOCALLY },
};
