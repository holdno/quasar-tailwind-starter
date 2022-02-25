<template>
  <q-btn color="primary" label="TestNotify" @click="notify" />
</template>

<script lang="ts" setup>
import store from "@/store/pinia";

function notify() {
  store.root.notify({ msg: "test" });
}
</script>
