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
import { mirrorExcGcsToGbqConfDetails } from '@/store/modules/easy-firestore/mirror-exc-gcs-to-gbq-conf-details';
import { notes } from '@/store/modules/easy-firestore/notes';
import { schemas } from '@/store/modules/easy-firestore/schemas';
import { storageToStorageConfs } from '@/store/modules/easy-firestore/storage-to-storage-confs';
import { storageToStorageConfsArchive } from '@/store/modules/easy-firestore/storage-to-storage-confs-archive';
import { storageToStorageRuns } from '@/store/modules/easy-firestore/storage-to-storage-runs';
import { storageToTablesConfs } from '@/store/modules/easy-firestore/storage-to-tables-confs';
import { storageToTablesConfArchive } from '@/store/modules/easy-firestore/storage-to-tables-conf-archive';
import { storageToTablesRuns } from '@/store/modules/easy-firestore/storage-to-tables-runs';
import { tableToStorageConfs } from '@/store/modules/easy-firestore/table-to-storage-confs';
import { tableToStorageConfArchive } from '@/store/modules/easy-firestore/table-to-storage-conf-archive';
import { tableToStorageRuns } from '@/store/modules/easy-firestore/table-to-storage-runs';
import { tablesToTablesRun } from '@/store/modules/easy-firestore/tables-to-tables-run';
import { tailerContextConfs } from '@/store/modules/easy-firestore/tailer-context-conf';
import { tailerContextConfsArchive } from '@/store/modules/easy-firestore/tailer-context-conf-archive';
import { users } from '@/store/modules/easy-firestore/users';
import { vmLauncherConfs } from '@/store/modules/easy-firestore/vm-launcher-confs';
import { vmLauncherConfArchive } from '@/store/modules/easy-firestore/vm-launcher-conf-archive';
import { vmLauncherRuns } from '@/store/modules/easy-firestore/vm-launcher-runs';
import { workflowConfs } from '@/store/modules/easy-firestore/workflow-confs';
import { workflowConfArchive } from '@/store/modules/easy-firestore/workflow-conf-archive';
import { workflowStatus } from '@/store/modules/easy-firestore/workflow-status';
import { xmlConversionConf } from '@/store/modules/easy-firestore/xml-conversion-conf';
import { xmlConversionConfArchive } from '@/store/modules/easy-firestore/xml-conversion-conf-archive';

export default [
	gcpCloudFunctions,
	accounts,
	connectionsHistory,
	schemas,
	notes,
	users,
	mirrorExcGcsToGbqConfDetails,
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
	storageToTablesConfs,
	storageToTablesConfArchive,
	storageToTablesRuns,
	tablesToTablesRun,
	tableToStorageConfs,
	tableToStorageConfArchive,
	tableToStorageRuns,
	tailerContextConfs,
	tailerContextConfsArchive,
	xmlConversionConf,
	xmlConversionConfArchive,
];
