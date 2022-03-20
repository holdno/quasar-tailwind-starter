<template>
  <router-view />
</template>

<script setup lang="ts"></script>
<style>
  input::placeholder,
  .placeholder {
    color: #999 !important;
    opacity: 0.8 !important;
  }

  .fade-enter-active {
    opacity: 0;
    will-change: transform;
    transition: all 200ms;
  }
  .fade-leave-active {
    opacity: 1;
    will-change: transform;
    transition: all 200ms;
  }
  .fade-enter {
    opacity: 1;
  }
  .fade-leave-active {
    opacity: 0;
  }
</style>
