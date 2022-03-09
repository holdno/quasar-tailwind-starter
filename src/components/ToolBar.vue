<template>
  <q-toolbar>
    <q-btn flat round dense icon="menu" @click="switchMenu" />
    <q-toolbar-title> Quasar + Vite + Pinia </q-toolbar-title>
  </q-toolbar>
</template>

<script lang="ts" setup>
import store from "@/store/pinia";
import { storeToRefs } from "pinia";

const emits = defineEmits(["show"]);

const drawer = storeToRefs(store.root).drawerDisplay;

function switchMenu() {
  drawer.value = !drawer.value;
}
</script>
