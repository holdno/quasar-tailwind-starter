<template>
  <q-toolbar>
    <q-btn flat round dense icon="menu" @click="switchMenu" />
    <q-toolbar-title> Quasar + Vite + Pinia </q-toolbar-title>
  </q-toolbar>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const emits = defineEmits(["show"]);
const drawer = ref(false);

function switchMenu() {
  drawer.value = !drawer.value;
  emits("show", drawer.value);
}
</script>
