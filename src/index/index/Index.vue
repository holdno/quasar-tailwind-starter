<template>{{ user?.name }}</template>

<script lang="ts" setup>
import store from "@/store/pinia";

const user = store.user.getUser;
</script>
