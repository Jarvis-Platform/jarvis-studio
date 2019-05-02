export default [
  {
    path: "/",
    name: "home",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "mirrorexcgcstogbqconf" */ "@/views/MirrorExcGcsToGcsConf.vue")
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
      import(/* webpackChunkName: "accounts" */ "@/views/Accounts.vue")
  },
  {
    path: "/gcpcloudfunctions",
    name: "gcpcloudfunctions",
    meta: {
      authRequired: true,
      adminRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "gcpcloudfunctions" */ "@/views/GcpCloudFunctions.vue")
  },
  {
    path: "/dagconfigurations",
    name: "dagconfigurations",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "dagconfigurations" */ "@/views/DagConfigurations.vue")
  },
  {
    path: "/mirrorexcgcstogcsconf",
    name: "mirrorExcGcsToGcsConf",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "mirrorexcgcstogcsconf" */ "@/views/MirrorExcGcsToGcsConf.vue")
  },
  {
    path: "/mirrorexcgcstogcsruns",
    name: "mirrorExcGcsToGcsRuns",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "mirrorexcgcstogcsruns" */ "@/views/MirrorExcGcsToGcsRuns.vue")
  },
  {
    path: "/mirrorexcgcstogbqconf",
    name: "mirrorExcGcsToGbqConf",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "mirrorexcgcstogbqconf" */ "@/views/MirrorExcGcsToGbqConf.vue")
  },
  {
    path: "/mirrorexcgcstogbqruns",
    name: "mirrorExcGcsToGbqRuns",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "mirrorexcgcstogbqruns" */ "@/views/MirrorExcGcsToGbqRuns.vue")
  },
  {
    path: "/viewgbqtogcsConf",
    name: "viewGbqToGcsConf",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "viewgbqtogcsconf" */ "@/views/ViewGbqToGcsConf.vue")
  },
  {
    path: "/viewgbqtogcsruns",
    name: "viewGbqToGcsRuns",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "viewgbqtogcsruns" */ "@/views/ViewGbqToGcsRuns.vue")
  },
  {
    path: "/vmlauncherruns",
    name: "vmLauncherRuns",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "vmlauncherruns" */ "@/views/VmLauncherRuns.vue")
  },
  {
    path: "/vmlauncherconf",
    name: "vmLauncherConf",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "vmlauncherconf" */ "@/views/VmLauncherConf.vue")
  }
];
