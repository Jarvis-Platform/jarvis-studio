import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import VuexEasyFirestore from 'vuex-easy-firestore';
import VuexPersist from 'vuex-persist';
import { RootState } from '@/types';

import { userModule } from './modules/user';
import { filtersModule } from './modules/filters';
import easyFirestoreModules from './modules/easy-firestore';
import { firebase } from '../plugins/firebase';
import { KEY } from '@/constants/store/vuex-persist';

Vue.use(Vuex);

const easyFirestore = VuexEasyFirestore(easyFirestoreModules, {
	logging: process.env.NODE_ENV === 'development',
	FirebaseDependency: firebase,
	preventInitialDocInsertion: true,
});

const vuexPersist = new VuexPersist({
	key: KEY,
	storage: window.localStorage,
	reducer: (state: any) => ({
		filters: state.filters,
	}),
});

const storeOptions: StoreOptions<RootState> = {
	modules: { user: userModule, filters: filtersModule },
	plugins: [easyFirestore, vuexPersist.plugin],
};

export default new Vuex.Store<RootState>(storeOptions);
