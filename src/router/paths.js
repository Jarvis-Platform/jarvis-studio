export default [
	/**
	 * App
	 */
	{
		path: '/',
		name: 'home',
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
	},

	/**
	 * Auth
	 */
	{
		path: '/signin',
		name: 'signin',
		meta: {
			public: true
		},
		component: () => import(/* webpackChunkName: "signin" */ '@/views/Signin.vue')
	},
	{
		path: '/signinemail',
		name: 'signinEmail',
		meta: {
			public: true
		},
		component: () => import(/* webpackChunkName: "signinEmail" */ '@/views/SigninEmail.vue')
	},

	/**
	 * Settings
	 */
	{
		path: '/settings/user/profile',
		name: 'userProfile',
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "userprofile" */ '@/views/UserProfile.vue')
	},
	{
		path: '/settings/users',
		name: 'users',
		meta: {
			authRequired: true,
			adminRequired: true
		},
		component: () => import(/* webpackChunkName: "users" */ '@/views/settings/Users.vue')
	},
	{
		path: '/accounts',
		name: 'accounts',
		meta: {
			authRequired: true,
			adminRequired: true
		},
		component: () => import(/* webpackChunkName: "accounts" */ '@/views/Accounts.vue'),
		alias: '/settings/accounts'
	},
	{
		path: '/gcpcloudfunctions',
		name: 'gcpcloudfunctions',
		meta: {
			authRequired: true,
			adminRequired: true
		},
		component: () => import(/* webpackChunkName: "gcpcloudfunctions" */ '@/views/GcpCloudFunctions.vue'),
		alias: '/settings/gcpcloudfunctions'
	},

	/**
	 * GcsToGcs
	 */
	{
		path: '/gcstogcsconfs',
		name: 'GcsToGcsConfs',
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "gcstogcsconfs" */ '@/views/GcsToGcsConfs.vue'),
		alias: '/conf/gcstogcs'
	},
	{
		path: '/gcstogcsruns',
		name: 'GcsToGcsRuns',
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "gcstogcsruns" */ '@/views/GcsToGcsRuns.vue'),
		alias: '/runs/gcstogcs'
	},
	{
		path: '/conf/gcstogcs/:confId',
		name: 'GcsToGcsConf',
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "gcstogcsconf" */ '@/views/GcsToGcsConf.vue')
	},
	{
		path: '/gcstogcs/runs/:runId',
		name: 'GcsToGcsRun',
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "gcstogcsrun" */ '@/views/GcsToGcsRun.vue')
	},

	/**
	 * Storage to storage
	 */
	{
		path: '/storagetostorage/runs/:runId',
		name: 'StorageToStorageRun',
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "storagetostoragerun" */ '@/views/StorageToStorageRun.vue')
	},
	{
		path: '/storagetostorage/confs',
		name: 'StorageToStorageConfs',
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "storagetostorageconfs" */ '@/views/StorageToStorageConfs.vue')
	},
	{
		path: '/storagetostorage/confs/:pathId',
		name: 'StorageToStorageConf',
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "storagetostorageconf" */ '@/views/StorageToStorageConf.vue')
	},
	{
		path: '/storagetostorage/runs',
		name: 'StorageToStorageRuns',
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "storagetostorageruns" */ '@/views/StorageToStorageRuns.vue')
	},

	/**
	 * Storage to table
	 */
	{
		path: '/storagetotable/confs',
		name: 'GcsToGbqConfs',
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "gcstogbqconfs" */ '@/views/GcsToGbqConfs.vue'),
		alias: '/conf/gcstogbq'
	},
	{
		path: '/storagetotable/confs/:pathId',
		name: 'StorageToTableConf',
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "storagetotableconf" */ '@/views/StorageToTableConf.vue')
	},
	{
		path: '/storagetotable/runs',
		name: 'GcsToGbqRuns',
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "gcstogbqruns" */ '@/views/GcsToGbqRuns.vue'),
		alias: '/runs/gcstogbq'
	},
	{
		path: '/storagetotable/runs/:pathId',
		name: 'StorageToTableRun',
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "storagetotablerun" */ '@/views/StorageToTableRun.vue')
	},

	/**
	 * Tables to tables
	 */
	{
		path: '/tablestotables/confs',
		name: 'TablesToTablesConfs',
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "tablestotablesconfs" */ '@/views/TablesToTablesConfs.vue'),
		alias: '/conf/gbqtogbq'
	},
	{
		path: '/tablestotables/confs/:pathId',
		name: 'TablesToTablesConf',
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "tablestotablesconf" */ '@/views/TablesToTablesConf.vue')
	},
	{
		path: '/tablestotables/runs',
		name: 'TablesToTablesRuns',
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "storagetotableconfs" */ '@/views/TablesToTablesRuns.vue'),
		alias: '/runs/gbqtogbq'
	},
	{
		path: '/tablestotables/runs/:pathId',
		name: 'TablesToTablesRun',
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "tablestotablesrun" */ '@/views/TablesToTablesRun.vue')
	},

	/**
	 * GbqToGcs
	 */
	{
		path: '/gbqtogcsconfs',
		name: 'gbqToGcsConfs',
		meta: {
			authRequired: true
		},
		component: () =>
			import(/* webpackChunkName: "gbqtogcsconfs" */ '@/views/data-workflows/gbq-to-gcs/ConfigurationsView.vue'),
		alias: '/conf/gbqtogcs'
	},
	{
		path: '/gbqtogcs/conf/:confId',
		name: 'GbqToGcsConf',
		meta: {
			authRequired: true
		},
		component: () =>
			import(/* webpackChunkName: "gbqtogcsconfs" */ '@/views/data-workflows/gbq-to-gcs/ConfigurationView.vue')
	},
	{
		path: '/gbqtogcsruns',
		name: 'gbqToGcsRuns',
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "gbqtogcsruns" */ '@/views/GbqToGcsRuns.vue'),
		alias: '/runs/gbqtogcs'
	},

	/**
	 * Table to Storage
	 */
	{
		path: '/tabletostorage/confs',
		name: 'TableToStorageConfs',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "tabletostorageconfs" */ '@/views/data-workflows/table-to-storage/ConfigurationsView.vue'
			)
	},
	{
		path: '/tabletostorage/conf/:confId',
		name: 'TableToStorageConf',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "tabletostorageconfs" */ '@/views/data-workflows/table-to-storage/ConfigurationView.vue'
			)
	},
	{
		path: '/tabletostorage/runs',
		name: 'TableToStorageRuns',
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "tabletostorageruns" */ '@/views/TableToStorageRuns.vue')
	},

	// {
	// 	path: '/tabletostorage/runs/:pathId',
	// 	name: 'TableToStorageRun',
	// 	meta: {
	// 		authRequired: true
	// 	},
	// 	component: () => import(/* webpackChunkName: "tabletostoragerun" */ '@/views/TableToStorageRun.vue')
	// },

	/**
	 * VM launcher
	 */
	{
		path: '/vmlauncherruns',
		name: 'vmLauncherRuns',
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "vmlauncherruns" */ '@/views/VmLauncherRuns.vue'),
		alias: '/runs/vmlauncher'
	},
	{
		path: '/vmlauncherconfs',
		name: 'vmLauncherConfs',
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "vmlauncherconfs" */ '@/views/VmLauncherConfs.vue'),
		alias: '/conf/vmlauncher'
	},

	/**
	 * Workflow
	 */
	{
		path: '/conf/workflow',
		name: 'WorkflowConfs',
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "workflowconfs" */ '@/views/WorkflowConfs.vue')
	},
	{
		path: '/status/workflow',
		name: 'WorkflowStatus',
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "workflowstatus" */ '@/views/WorkflowStatus.vue')
	},

	/**
	 * Data Model
	 */
	{
		path: '/datamodel/:projectId/:datasetId/:tableId',
		name: 'DataTableDetails',
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "datatabledetails" */ '@/views/DataTableDetails.vue')
	}
];
