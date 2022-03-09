<template>
  <q-layout
    view="hHh Lpr lff"
    class="rounded-borders tw-flex tw-flex-no-wrap tw-h-full tw-w-full"
  >
    <q-header elevated class="bg-black">
      <ToolBar></ToolBar>
    </q-header>

    <q-drawer v-model="drawer" :mini="miniState" :width="200" :breakpoint="500">
      <Menu></Menu>
    </q-drawer>

    <q-page-container class="tw-w-full tw-box-border tw-bg-gray-50">
      <div class="lg:tw-p-4 md:tw-py-4 md:tw-px-10">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ToolBar from "@/components/ToolBar.vue";
import Menu from "./Menu.vue";
import store from "@/store/pinia";
import { storeToRefs } from "pinia";

const drawer = storeToRefs(store.root).drawerDisplay;
const miniState = ref(false);
</script>
