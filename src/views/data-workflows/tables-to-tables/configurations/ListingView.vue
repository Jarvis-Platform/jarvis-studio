<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<listing-component
			:type="listingType"
			:module-name="moduleName"
			:headers="headers"
			:overridden-columns="overriddenColumns"
		>
			<template v-slot:id="{ item: { id } }">
				<router-link :to="{ name: routeName, params: { id } }">
					<span class="font-weight-medium">{{ id }}</span>
				</router-link>
			</template>
		</listing-component>
	</div>
</template>

<script>
import DataManagementHeader from '../../../../components/data-workflows/DataManagementHeader';
import ListingComponent from '@/components/data-workflows/common/listing/ListingComponent';

import HeaderInfosMixin from '../header-infos';

import { CONFIGURATIONS } from '@/constants/data-workflows/status';
import { TABLES_TO_TABLES_CONFIGURATIONS_ITEM } from '@/constants/router/routes-names';
import {
	ACCOUNT,
	ACTIONS,
	ACTIVATED,
	CONF_WORKFLOW_LENGTH,
	DEFAULT_BQ_DATASET,
	ENVIRONMENT,
	ID
} from '@/constants/data-workflows/listing/header-items';

export default {
	name: 'tables-to-tables-configurations-listing-view',
	components: { DataManagementHeader, ListingComponent },
	mixins: [HeaderInfosMixin],
	data() {
		return {
			moduleName: 'getGbqToGbqConfs',
			overriddenColumns: ['id']
		};
	},
	computed: {
		listingType() {
			return CONFIGURATIONS;
		},
		routeName() {
			return TABLES_TO_TABLES_CONFIGURATIONS_ITEM;
		},
		headers() {
			return [ACCOUNT, ENVIRONMENT, ID, DEFAULT_BQ_DATASET, CONF_WORKFLOW_LENGTH, ACTIVATED, ACTIONS];
		}
	}
};
</script>