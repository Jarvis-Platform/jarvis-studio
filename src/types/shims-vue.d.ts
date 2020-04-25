import Vue from 'vue';
import { AnyObject } from '@/types';
import HttpsCallableResult = firebase.functions.HttpsCallableResult;

declare module '*.vue' {
	export default Vue;
}

declare module 'vue/types/vue' {
	interface Vue {
		$httpsCallableFunction: (name: string, data: AnyObject) => Promise<HttpsCallableResult>;
		$perf: any;
	}
}
