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
        name: "one",
        path: "one",
        component: () => import("@/index/examples/one.vue"),
      },
    ],
  },
];
