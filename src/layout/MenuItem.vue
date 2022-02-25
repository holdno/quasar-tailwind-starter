<template>
  <!-- <q-separator class="tw-bg-stone-800" /> -->
  <template v-for="item in items" :key="item.title">
    <template v-if="item.children && item.children.length > 0">
      <q-expansion-item
        :label="item.title"
        :header-class="
          'tw-font-medium ' + (item.open ? 'tw-text-black' : 'tw-text-gray-600')
        "
        :header-inset-level="insetLevel"
        :icon="item.icon"
        v-model="item.open"
      >
        <MenuItem :items="item.children" :level="level + 1"></MenuItem>
      </q-expansion-item>
    </template>
    <template v-else>
      <q-item
        v-ripple
        clickable
        v-model="item.open"
        :inset-level="insetLevel"
        :to="item.router"
        class="tw-text-gray-600 tw-font-medium"
      >
        <q-item-section avatar>
          <q-icon :name="item.icon" />
        </q-item-section>

        <q-item-section>{{ item.title }}</q-item-section>
      </q-item>
    </template>
  </template>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { Menu } from "@/types/menu";

const props = defineProps({
  items: {
    type: Object as PropType<Menu[]>,
    default: null,
  },
  level: {
    type: Number,
    default: 1,
  },
});

const insetLevel = props.level * 0.2;
</script>
