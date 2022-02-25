<template>
  <q-layout
    view="hHh Lpr lff"
    class="rounded-borders tw-flex tw-flex-no-wrap tw-h-full tw-w-full"
  >
    <q-header elevated class="bg-black">
      <ToolBar @show="showDrawer"></ToolBar>
    </q-header>

    <q-drawer v-model="drawer" :mini="miniState" :width="200" :breakpoint="500">
      <Menu></Menu>
    </q-drawer>

    <q-page-container class="tw-w-full tw-box-border tw-bg-gray-50">
      <div class="tw-p-4">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ToolBar from "@/components/ToolBar.vue";
import Menu from "./Menu.vue";

const drawer = ref(false);
const miniState = ref(false);
function showDrawer(value: boolean) {
  drawer.value = value;
}
</script>
