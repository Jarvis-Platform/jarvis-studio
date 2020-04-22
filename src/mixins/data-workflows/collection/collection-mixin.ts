import { Component, Vue } from 'vue-property-decorator';
import DataManagementHeader from '@/components/data-workflows/common/DataManagementHeader.vue';
import ListingComponent from '@/components/data-workflows/common/listing/ListingComponent.vue';

@Component({
	components: { DataManagementHeader, ListingComponent },
})
export default class CollectionMixin extends Vue {}
