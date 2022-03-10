export const routes = [
  {
    name: "login",
    path: "/login",
    component: () => import("@/dashboard/Login.vue"),
  },
  {
    path: "/",
    redirect: "index",
    component: () => import("@/layout/CommonLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        name: "index",
        path: "index",
        component: () => import("@/index/index/Index.vue"),
      },
      {
        name: "page1",
        path: "page1",
        component: () => import("@/index/examples/Page1.vue"),
      },
      {
        name: "page2",
        path: "page2",
        component: () => import("@/index/examples/Page2.vue"),
      },
      {
        name: "page3",
        path: "page3",
        component: () => import("@/index/examples/Page3.vue"),
      },
      {
        name: "page4",
        path: "/page2/page4",
        meta: {
          activeRouteName: "page2", // menu which named 'page2' is actived when this router on target
        },
        component: () => import("@/index/examples/Page2/page4.vue"),
      },
      {
        name: "one",
        path: "one",
        component: () => import("@/index/examples/one.vue"),
      },
    ],
  },
];
