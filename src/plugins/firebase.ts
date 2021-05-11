import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/analytics';
import 'firebase/database';
import 'firebase/performance';
import 'firebase/remote-config';
import { FirebaseOptions } from '@firebase/app-types';
import { AnyObject } from '@/types';
import { defaultConfig } from '@/remote-config/default-config';

// const isLocalHost = location.hostname === 'localhost';
const isLocalHost = false;

const options: FirebaseOptions = {
	apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
	appId: process.env.VUE_APP_FIREBASE_APP_ID,
	authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: isLocalHost
		? `http://localhost:9000?ns=${process.env.VUE_APP_FIREBASE_PROJECT_ID}`
		: process.env.VUE_APP_FIREBASE_DATABASE_URL,
	measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
	projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
};

Vue.prototype.$httpsCallableFunction = (name: string, data: AnyObject = {}) => {
	return new Promise((resolve, reject) => {
		const callableFunction = firebase.app().functions('europe-west1').httpsCallable(name);

		callableFunction(data)
			.then(resolve)
			.catch((err) => reject(err));
	});
};

async function initFirebase() {
	firebase.initializeApp(options);

	const remoteConfig = firebase.remoteConfig();
	remoteConfig.defaultConfig = defaultConfig;
	await remoteConfig.fetchAndActivate();
	Vue.prototype.$remoteConfig = remoteConfig;

	if (isLocalHost) {
		firebase.functions().useFunctionsEmulator('http://localhost:5001');
		firebase.firestore().settings({ host: 'localhost:8081', ssl: false });
	} else {
		firebase.analytics();

		Vue.prototype.$perf = () => {
			return firebase.performance();
		};
	}

	firebase
		.auth()
		.setPersistence(firebase.auth.Auth.Persistence.SESSION)
		.catch((error) => console.error(error.message));

	return new Promise((resolve, reject) => {
		firebase
			.firestore()
			.enablePersistence({ synchronizeTabs: true })
			.then(resolve)
			.catch((err) => {
				if (err.code === 'failed-precondition') {
					// Multiple tabs open, persistence can only be enabled in one tab at a a time.
					reject(err);
				} else if (err.code === 'unimplemented') {
					// The current browser does not support all of the features required to enable persistence
					reject(err);
				}
			});
	});
}

export { firebase, initFirebase };
