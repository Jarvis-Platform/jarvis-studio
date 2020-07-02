import { accounts } from '@/store/modules/easy-firestore/accounts';
import { connectionsHistory } from '@/store/modules/easy-firestore/connections-history';
import { dataModels } from '@/store/modules/easy-firestore/data-models';
import { dataTableDetails } from '@/store/modules/easy-firestore/data-table-details';
import { dataTables } from '@/store/modules/easy-firestore/data-tables';
import { gcpCloudFunctions } from '@/store/modules/easy-firestore/gcpCloudFunctions';
import { gbqToGbqTasksStatus } from '@/store/modules/easy-firestore/gbq-to-gbq-tasks-status';
import { getGbqToGbqConfs } from '@/store/modules/easy-firestore/get-gbq-to-gbq-confs';
import { getGbqToGbqConfArchive } from '@/store/modules/easy-firestore/get-gbq-to-gbq-conf-archive';
import { getGbqToGbqRuns } from '@/store/modules/easy-firestore/get-gbq-to-gbq-runs';
import { getGbqToGcsConfs } from '@/store/modules/easy-firestore/get-gbq-to-gcs-confs';
import { getGbqToGcsConfsArchive } from '@/store/modules/easy-firestore/get-gbq-to-gcs-confs-archive';
import { getGbqToGcsRuns } from '@/store/modules/easy-firestore/get-gbq-to-gcs-runs';
import { mirrorExcGcsToGbqConfDetails } from '@/store/modules/easy-firestore/mirror-exc-gcs-to-gbq-conf-details';
import { mirrorExcGcsToGbqConfArchive } from '@/store/modules/easy-firestore/mirror-exc-gcs-to-gbq-conf-archive';
import { mirrorExcGcsToGbqConfs } from '@/store/modules/easy-firestore/mirror-exc-gcs-to-gbq-confs';
import { mirrorExcGcsToGbqRuns } from '@/store/modules/easy-firestore/mirror-exc-gcs-to-gbq-runs';
import { mirrorExcGcsToGcsConfs } from '@/store/modules/easy-firestore/mirror-exc-gcs-to-gcs-confs';
import { mirrorExcGcsToGcsRuns } from '@/store/modules/easy-firestore/mirror-exc-gcs-to-gcs-runs';
import { mirrorExcGcsToGcsConfsArchive } from '@/store/modules/easy-firestore/mirror-exc-gcs-to-gcs-confs-archive';
import { notes } from '@/store/modules/easy-firestore/notes';
import { schemas } from '@/store/modules/easy-firestore/schemas';
import { storageToStorageConfs } from '@/store/modules/easy-firestore/storage-to-storage-confs';
import { storageToStorageConfsArchive } from '@/store/modules/easy-firestore/storage-to-storage-confs-archive';
import { storageToStorageRuns } from '@/store/modules/easy-firestore/storage-to-storage-runs';
import { storageToTableConf } from '@/store/modules/easy-firestore/storage-to-table-conf';
import { storageToTableRun } from '@/store/modules/easy-firestore/storage-to-table-run';
import { storageToTablesConfs } from '@/store/modules/easy-firestore/storage-to-tables-confs';
import { storageToTablesConfArchive } from '@/store/modules/easy-firestore/storage-to-tables-conf-archive';
import { storageToTablesRuns } from '@/store/modules/easy-firestore/storage-to-tables-runs';
import { tableToStorageConfs } from '@/store/modules/easy-firestore/table-to-storage-confs';
import { tableToStorageConfArchive } from '@/store/modules/easy-firestore/table-to-storage-conf-archive';
import { tableToStorageRuns } from '@/store/modules/easy-firestore/table-to-storage-runs';
import { tablesToTablesRun } from '@/store/modules/easy-firestore/tables-to-tables-run';
import { users } from '@/store/modules/easy-firestore/users';
import { vmLauncherConfs } from '@/store/modules/easy-firestore/vm-launcher-confs';
import { vmLauncherConfArchive } from '@/store/modules/easy-firestore/vm-launcher-conf-archive';
import { vmLauncherRuns } from '@/store/modules/easy-firestore/vm-launcher-runs';
import { workflowConfs } from '@/store/modules/easy-firestore/workflow-confs';
import { workflowConfArchive } from '@/store/modules/easy-firestore/workflow-conf-archive';
import { workflowStatus } from '@/store/modules/easy-firestore/workflow-status';

export default [
	gcpCloudFunctions,
	accounts,
	connectionsHistory,
	schemas,
	notes,
	users,
	mirrorExcGcsToGcsRuns,
	mirrorExcGcsToGcsConfs,
	mirrorExcGcsToGcsConfsArchive,
	mirrorExcGcsToGbqRuns,
	mirrorExcGcsToGbqConfs,
	mirrorExcGcsToGbqConfArchive,
	mirrorExcGcsToGbqConfDetails,
	getGbqToGcsRuns,
	getGbqToGcsConfs,
	getGbqToGcsConfsArchive,
	gbqToGbqTasksStatus,
	getGbqToGbqConfs,
	getGbqToGbqConfArchive,
	getGbqToGbqRuns,
	vmLauncherConfs,
	vmLauncherConfArchive,
	vmLauncherRuns,
	workflowConfs,
	workflowConfArchive,
	workflowStatus,
	dataModels,
	dataTables,
	dataTableDetails,
	storageToStorageConfs,
	storageToStorageConfsArchive,
	storageToStorageRuns,
	storageToTableConf,
	storageToTablesConfs,
	storageToTablesConfArchive,
	storageToTableRun,
	storageToTablesRuns,
	tablesToTablesRun,
	tableToStorageConfs,
	tableToStorageConfArchive,
	tableToStorageRuns,
];
