import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import { routes } from "./router";
import { useUserStore } from "@/store/modules/user";

const router = createRouter({
  // 4. 采用hash 模式
  history: createWebHashHistory(),
  // 采用 history 模式
  // history: createWebHistory(),
  routes, // short for `routes: routes`
});

router.beforeEach((to, from) => {
  const userStore = useUserStore();
  let admin = userStore.getUser;
  if (!admin?.id && to.fullPath != "/login") {
    router.push("/login");
    return true;
  }
  return true;
});

export default router;
