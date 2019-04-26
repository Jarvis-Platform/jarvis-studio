export default [
  {
    path: "/",
    name: "home",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "dagconfigurations" */ "@/views/DagConfigurations.vue")
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
    path: "/dagruns",
    name: "dagruns",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "dagruns" */ "@/views/DagRuns.vue")
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
    path: "/mirrorgcsconfigurations",
    name: "mirrorgcsconfigurations",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "mirrorgcsconfigurations" */ "@/views/MirrorGcsConfigurations.vue")
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
    path: "/mirrorexcgcstogbqruns",
    name: "mirrorExcGcsToGbqRuns",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "mirrorexcgcstogbqruns" */ "@/views/MirrorExcGcsToGbqRuns.vue")
  }
];