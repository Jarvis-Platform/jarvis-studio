export default [
  {
    path: "/",
    name: "home",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "gcstogbqconfs" */ "@/views/Home.vue")
  },
  {
    path: "/home",
    name: "homevue",
    meta: {
      authRequired: true
    },
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue")
  },
  {
    path: "/signin",
    name: "signin",
    meta: {
      public: true
    },
    component: () =>
      import(/* webpackChunkName: "signin" */ "@/views/Signin.vue")
  },
  {
    path: "/accounts",
    name: "accounts",
    meta: {
      authRequired: true,
      adminRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "accounts" */ "@/views/Accounts.vue"),
    alias: "/settings/accounts"
  },
  {
    path: "/gcpcloudfunctions",
    name: "gcpcloudfunctions",
    meta: {
      authRequired: true,
      adminRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "gcpcloudfunctions" */ "@/views/GcpCloudFunctions.vue"),
    alias: "/settings/gcpcloudfunctions"
  },
  {
    path: "/gcstogcsconfs",
    name: "GcsToGcsConfs",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "gcstogcsconfs" */ "@/views/GcsToGcsConfs.vue"),
    alias: "/conf/gcstogcs"
  },
  {
    path: "/gcstogcsruns",
    name: "GcsToGcsRuns",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "gcstogcsruns" */ "@/views/GcsToGcsRuns.vue"),
    alias: "/runs/gcstogcs"
  },
  {
    path: "/conf/gcstogcs/:confId",
    name: "GcsToGcsConf",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "gcstogcsconf" */ "@/views/GcsToGcsConf.vue")
  },
  {
    path: "/storagetostorage/runs/:runId",
    name: "StorageToStorageRun",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "storagetostoragerun" */ "@/views/StorageToStorageRun.vue")
  },
  {
    path: "/storagetotable/confs",
    name: "GcsToGbqConfs",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "gcstogbqconfs" */ "@/views/GcsToGbqConfs.vue"),
    alias: "/conf/gcstogbq"
  },
  {
    path: "/storagetotable/confs/:pathId",
    name: "StorageToStorageConf",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "storagetotableconf" */ "@/views/StorageToTableConf.vue")
  },
  {
    path: "/storagetotable/runs",
    name: "GcsToGbqRuns",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "gcstogbqruns" */ "@/views/GcsToGbqRuns.vue"),
    alias: "/runs/gcstogbq"
  },
  {
    path: "/storagetotable/runs/:pathId",
    name: "StorageToTableRun",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "storagetotablerun" */ "@/views/StorageToTableRun.vue")
  },
  {
    path: "/tablestotables/confs",
    name: "TablesToTablesConfs",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "tablestotablesconfs" */ "@/views/TablesToTablesConfs.vue"),
    alias: "/conf/gbqtogbq"
  },
  {
    path: "/tablestotables/confs/:pathId",
    name: "TablesToTablesConf",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "tablestotablesconf" */ "@/views/TablesToTablesConf.vue")
  },
  {
    path: "/tablestotables/runs",
    name: "TablesToTablesRuns",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "storagetotableconfs" */ "@/views/TablesToTablesRuns.vue"),
    alias: "/runs/gbqtogbq"
  },
  {
    path: "/gbqtogcsconfs",
    name: "gbqToGcsConfs",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "gbqtogcsconfs" */ "@/views/GbqToGcsConfs.vue"),
    alias: "/conf/gbqtogcs"
  },
  {
    path: "/gbqtogcsruns",
    name: "gbqToGcsRuns",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "gbqtogcsruns" */ "@/views/GbqToGcsRuns.vue"),
    alias: "/runs/gbqtogcs"
  },
  {
    path: "/vmlauncherruns",
    name: "vmLauncherRuns",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "vmlauncherruns" */ "@/views/VmLauncherRuns.vue"),
    alias: "/runs/vmlauncher"
  },
  {
    path: "/vmlauncherconfs",
    name: "vmLauncherConfs",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "vmlauncherconfs" */ "@/views/VmLauncherConfs.vue"),
    alias: "/conf/vmlauncher"
  },
  {
    path: "/conf/workflow",
    name: "WorkflowConfs",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "workflowconfs" */ "@/views/WorkflowConfs.vue")
  },
  {
    path: "/status/workflow",
    name: "WorkflowStatus",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "workflowstatus" */ "@/views/WorkflowStatus.vue")
  },
  //Data Models
  {
    path: "/datamodel/:projectId/:datasetId/:tableId",
    name: "DataTableDetails",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "datatabledetails" */ "@/views/DataTableDetails.vue")
  }
];
