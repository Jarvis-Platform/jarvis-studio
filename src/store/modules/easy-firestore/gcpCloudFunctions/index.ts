import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME } from '@/constants/store/easy-firestore';

export const gcpCloudFunctions: IEasyFirestoreModule = {
	firestorePath: 'gcp-cloud-functions',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'gcpCloudFunctions',
	statePropName: STATE_PROP_NAME,
};
