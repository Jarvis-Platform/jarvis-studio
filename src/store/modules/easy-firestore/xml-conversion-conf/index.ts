import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const xmlConversionConf: IEasyFirestoreModule = {
	firestorePath: 'xml-conversion-conf',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'xmlConversionConf',
	statePropName: STATE_PROP_NAME,
	sync: SYNC,
};
