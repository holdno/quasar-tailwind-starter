<template>
  <q-scroll-area class="tw-w-full tw-h-full">
    <q-list padding>
      <MenuItem v-if="menu.length > 0" :items="menu"></MenuItem>
    </q-list>
  </q-scroll-area>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import MenuItem from "./MenuItem.vue";
import { useRouter, useRoute } from "vue-router";
import { Menu } from "@/types/menu";

const menu = ref<Menu[]>([
  {
    title: "一级页面",
    icon: "admin_panel_settings",
    router: { name: "one" },
    open: false,
  },
  {
    title: "主页",
    icon: "admin_panel_settings",
    open: false,
    children: [
      {
        title: "看板",
        icon: "admin_panel_settings",
        router: { name: "index" },
        open: false,
        children: [],
      },
    ],
  },
  {
    title: "层级示例",
    icon: "admin_panel_settings",
    router: {},
    open: false,
    children: [
      {
        title: "页面1",
        icon: "admin_panel_settings",
        router: { name: "page1" },
        open: false,
        children: [],
      },
      {
        title: "三级页面",
        icon: "admin_panel_settings",
        router: {},
        open: false,
        children: [
          {
            title: "页面2",
            icon: "admin_panel_settings",
            router: { name: "page2" },
            open: false,
            children: [],
          },
          {
            title: "页面3",
            icon: "admin_panel_settings",
            router: { name: "page3" },
            open: false,
            children: [],
          },
        ],
      },
    ],
  },
]);

const router = useRouter();
const route = useRoute();

function deepCheck(menu: Menu[]): boolean {
  let willOpen = false;
  for (let i = 0; i < menu.length; i++) {
    const item = menu[i];
    if (item.children && item.children.length > 0) {
      item.open = deepCheck(item.children);
      if (item.open) {
        willOpen = true;
      }
    } else if (item.router) {
      try {
        const itemPaths = router.resolve(item.router)?.matched;
        const itemRoute = itemPaths[itemPaths.length - 1];
        for (let ii = 0; ii < route.matched.length; ii++) {
          if (itemRoute.name == route.matched[ii].name) {
            console.log(itemRoute, true);
            willOpen = true;
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  }
  return willOpen;
}

watch(
  () => route.path,
  () => {
    deepCheck(menu.value);
  }
);

onMounted(() => {
  deepCheck(menu.value);
});
</script>
