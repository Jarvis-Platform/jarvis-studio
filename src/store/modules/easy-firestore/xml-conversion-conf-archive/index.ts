import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const xmlConversionConfArchive: IEasyFirestoreModule = {
	firestorePath: 'xml-conversion-conf-archive',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'xmlConversionConfArchive',
	statePropName: STATE_PROP_NAME,
	sync: SYNC,
};
