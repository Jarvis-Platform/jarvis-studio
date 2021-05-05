import { RouteConfig } from 'vue-router';

import { auth, hasAccount, remoteConfig } from '@/router/middleware';
import { DATA_WORKFLOWS } from '@/constants/router/paths-prefixes';
import { XML_CONVERSION } from '@/constants/data-workflows/names';
import { CONFIGURATIONS } from '@/constants/data-workflows/status';
import {
	XML_CONVERSION_CONFIGURATIONS_LISTING,
	XML_CONVERSION_CONFIGURATIONS_ITEM,
} from '@/constants/router/routes-names';

export const XMLConversionRoutes: RouteConfig[] = [
	/**
	 * CONFIGURATIONS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${XML_CONVERSION.url}/${CONFIGURATIONS}`,
		name: XML_CONVERSION_CONFIGURATIONS_LISTING,
		meta: { middleware: [auth, hasAccount, remoteConfig.canAccessXMLConversion] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/xml-conversion/configurations/listing" */ '@/views/data-workflows/xml-conversion/configurations/ListingView.vue'
			),
	},
	{
		path: `/${DATA_WORKFLOWS}/${XML_CONVERSION.url}/${CONFIGURATIONS}/:id`,
		name: XML_CONVERSION_CONFIGURATIONS_ITEM,
		meta: { middleware: [auth, hasAccount, remoteConfig.canAccessXMLConversion] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/xml-conversion/configurations/item" */ '@/views/data-workflows/xml-conversion/configurations/ItemView.vue'
			),
	},
];
