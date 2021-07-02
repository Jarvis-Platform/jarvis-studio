import StorageToStorageCollectionListing from './storage-to-storage/runs/CollectionListing.vue';
import StorageToTablesCollectionListing from './storage-to-tables/runs/CollectionListing.vue';
import TableToStorageCollectionListing from './table-to-storage/runs/CollectionListing.vue';
import TablesToTablesCollectionListing from './tables-to-tables/runs/CollectionListing.vue';
import VmLauncherCollectionListing from './vm-launcher/runs/CollectionListing.vue';

import { getGbqToGbqRuns } from '@/store/modules/easy-firestore/get-gbq-to-gbq-runs';
import { storageToStorageRuns } from '@/store/modules/easy-firestore/storage-to-storage-runs';
import { storageToTablesRuns } from '@/store/modules/easy-firestore/storage-to-tables-runs';
import { tableToStorageRuns } from '@/store/modules/easy-firestore/table-to-storage-runs';
import { vmLauncherRuns } from '@/store/modules/easy-firestore/vm-launcher-runs';

import { Component } from 'vue';

interface RunCollection {
	collectionListing: Component;
	moduleName: string;
}

export const StorageToStorage: RunCollection = {
	collectionListing: StorageToStorageCollectionListing,
	moduleName: storageToStorageRuns.moduleName,
};
export const StorageToTables: RunCollection = {
	collectionListing: StorageToTablesCollectionListing,
	moduleName: storageToTablesRuns.moduleName,
};
export const TableToStorage: RunCollection = {
	collectionListing: TableToStorageCollectionListing,
	moduleName: tableToStorageRuns.moduleName,
};
export const TablesToTables: RunCollection = {
	collectionListing: TablesToTablesCollectionListing,
	moduleName: getGbqToGbqRuns.moduleName,
};
export const VmLauncher: RunCollection = {
	collectionListing: VmLauncherCollectionListing,
	moduleName: vmLauncherRuns.moduleName,
};
