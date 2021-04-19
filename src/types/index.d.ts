import { NavigationGuard, Route } from 'vue-router';
import { User as FirebaseUser } from 'firebase/app';
import { IPluginState } from 'vuex-easy-firestore/types/declarations';

// Router
export interface Context {
	to: Route;
	from: Route;
	// TODO: Update `next` when this PR from vue-router will be merged => https://github.com/vuejs/vue-router/pull/2497
	next: Parameters<NavigationGuard>[2];
	store: any;
}
export type Middleware = (context: Context, nextPipeline: MiddlewarePipeline) => Route | MiddlewarePipeline;
export type MiddlewarePipeline = (context: Context, middleware: Middleware[], index: number) => Middleware | any;

// State
export interface RootState {
	user: UserState;
	filters: FilterState;
	accounts: IPluginState;
	schemas: IPluginState;
	notes: NotesState;
	mirrorExcGcsToGcsRuns: IPluginState;
	mirrorExcGcsToGcsConfs: IPluginState;
	mirrorExcGcsToGcsConfsArchive: IPluginState;
	mirrorExcGcsToGbqRuns: IPluginState;
	mirrorExcGcsToGbqConfs: IPluginState;
	mirrorExcGcsToGbqConfDetails: IPluginState;
	gcpCloudFunctions: IPluginState;
	getGbqToGcsRuns: IPluginState;
	getGbqToGcsConfs: IPluginState;
	getGbqToGbqConfs: IPluginState;
	getGbqToGbqRuns: IPluginState;
	vmLauncherConfs: IPluginState;
	vmLauncherRuns: IPluginState;
	workflowConfs: IPluginState;
	workflowStatus: IPluginState;
	dataModels: IPluginState;
	dataTables: IPluginState;
	dataTableDetails: IPluginState;
	storageToStorageConfs: IPluginState;
	storageToStorageRuns: IPluginState;
	storageToTableConf: IPluginState;
	storageToTablesConfs: IPluginState;
	storageToTableRun: IPluginState;
	storageToTablesRuns: IPluginState;
	tablesToTablesRun: IPluginState;
	tableToStorageConfs: IPluginState;
	tableToStorageRuns: IPluginState;
}

export interface NotesState {
	parentNote: Note | {};
	threadNotes: Note[] | [];
	showThreadPanel: boolean;
}

export interface UserState {
	user: User | null;
	isAuthenticated: boolean;
}

export type DateLabel = 'Today' | 'Last 2 Days' | 'Last 7 Days' | 'Last 30 Days' | 'Last 90 Days';
export type NbDays = 0 | 1 | 7 | 31 | 90;
export interface DateFilter {
	label: DateLabel;
	value: NbDays;
}
export type EnvLabel = 'All Env.' | 'Production' | 'Pre-Production' | 'Staging' | 'Development';
export type EnvId = 'ALL' | 'PROD' | 'PREPROD' | 'STAGING' | 'DEV';
export interface EnvFilter {
	label: EnvLabel;
	value: EnvId;
}
export type RunStatusLabel = 'All Status' | 'Success' | 'Failed' | 'Running' | 'No Match' | 'Checked';
export type RunStatusId = 'ALL' | 'SUCCESS' | 'FAILED' | 'RUNNING' | 'NO_MATCH' | 'CHECKED';
export interface RunStatusFilter {
	label: RunStatusLabel;
	value: RunStatusId;
}
export type ConfActivatedLabel = 'All Status' | 'Activated' | 'Disabled' | 'Archived';
export type ConfActivatedValue = 'ALL' | boolean;
export interface ConfActivatedFilter {
	label: ConfActivatedLabel;
	value: ConfActivatedValue;
}

export type AccountId = '000000' | '000010' | '000020' | '000040' | '000050' | '000060' | '000099';

export interface Account {
	account_name: 'All Accounts' | 'Jules' | 'Pimkie' | 'Grain de Malice' | 'Orsay' | 'RougeGorge' | 'jarvis-demo';
	id: AccountId;
}
export interface FilterState {
	dateFilterSelected: DateFilter;
	dateFilters: DateFilter[];
	envFilterSelected: EnvFilter;
	envFilters: EnvFilter[];
	runStatusFilterSelected: RunStatusFilter;
	runStatusFilters: RunStatusFilter[];
	confActivatedFilterSelected: ConfActivatedFilter;
	confActivatedFilters: ConfActivatedFilter[];
	minDateFilter: string;
	accountFilterSelected: Account;
	filteredAccounts: Account[];
}

// User
type RoleCode = 0 | 1 | 2 | 3 | 4 | 5;
export interface Role {
	roleName: string;
	roleCode: RoleCode;
}
export interface User extends FirebaseUser {
	accounts: string[];
	customClaims: AnyObject;
	disabled: boolean;
	location: string;
	phone: string;
	skype: string;
	studioRoles: RoleCode;
	timezone: string;
	title: string;
}

// Vue App
export interface HeaderItem {
	text: string;
	sortable: boolean;
	value: string;
}

export interface ListingComponentProps {
	type: DataWorkflowsType;
	moduleName: string;
	headers: HeaderItem[];
	customDataFetching?: () => AnyObject[];
	overriddenColumns?: string[];
	sortBy?: string;
	sortDesc?: boolean;
	itemsPerPage?: number;
	isOtherRunDisplay?: boolean;
	jobId?: string;
	showDeleteAction?: boolean;
	directExecutionPath?: string;
}

export interface ConfigurationProps {
	type: string;
	docId: string;
	tabsItems: object[];
	isLoading: boolean;
	isNotFound: boolean;
	updateInformation: Object;
	moduleName: string;
	archivedConfsModuleName: string;
}

export interface RunProps {
	type: string;
	tabsItems: object[];
	isLoading: boolean;
	isNotFound: boolean;
}

export interface StatusProps extends RunProps {}

export interface Doc {
	[key: string]: any;
}

export interface Note {
	account: AccountId;
	created_at: string;
	created_by: string;
	id: string;
	isThreadNote: boolean;
	moduleName: string;
	parentNoteId: string;
	relatedDocId: string;
	routeName: string;
	text: string;
	updated_at: string;
	updated_by: string;
	userId: string;
	userDisplayName: string;
	userEmail: string;
	userPhotoURL: string;
}

export interface Snackbar {
	isVisible: boolean;
	text: string;
	timeout: number;
	color?: string;
}

export type RunStatus = 'SUCCESS' | 'FAILED' | 'RUNNING' | 'CHECKED';

export type AnyObject = { [index: string]: any };

// DataWorkflows
export type DataWorkflowsType = 'runs' | 'configurations' | 'status' | null;

// Configuration
export interface Configuration {
	[key: string]: any;
}

// Run
export interface Run {
	[key: string]: any;
}

// Tabs
export interface Tab {
	label: string;
	href: string;
	component: {
		name: string;
		props: AnyObject;
	};
}

export interface DataItem {
	component: string;
	props: AnyObject;
}

export interface RunDetailsTab extends Tab {
	component: {
		name: string;
		props: {
			data: DataItem[];
		};
	};
}

export interface RunLogsTab extends Tab {
	component: {
		name: string;
		props: {
			dagId: string;
			dagRunId: string;
			dagType: string;
			dagExecutionDate: string;
		};
	};
}

export interface OtherRunTab extends Tab {
	component: {
		name: string;
		props: {
			doc: Doc;
			moduleName: string;
		};
	};
}

export interface ConfigurationTab extends Tab {
	component: {
		name: string;
		props: {
			data: DataItem[];
		};
	};
}

export interface FullJSONTab extends Tab {
	component: {
		name: string;
		props: {
			json: AnyObject;
			jsonId: string;
		};
	};
}

export interface NotesTab extends Tab {
	component: {
		name: string;
		props: {
			moduleName: string;
			relatedDocId: string;
			account: AccountId;
		};
	};
}

export interface TaskListingTab extends Tab {
	component: {
		name: string;
		props: {
			type: DataWorkflowsType;
			docId: string;
			dagId: string;
			dagRunId: string;
			dagType: string;
			dagExecutionDate: string;
			tasksConf: AnyObject[];
			tasksSQL: AnyObject;
			dagConf: AnyObject;
		};
	};
}

// Filters
// TODO: Define type
export type WhereConfFilter = any;

// Storage to Storage
export type DestinationStorageRows = {
	gcs: Object[];
	s3: Object[];
	sftp: Object[];
};

// Data
export interface TableParameter {
	id: string;
	label: string;
	value: any;
}

// Firestore
export interface FirestoreAccount extends Account {
	dlk_gcp_id_project: string;
	exc_gcp_id_project: string;
	git_repo: string;
}
