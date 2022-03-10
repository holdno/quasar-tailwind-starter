<template>
  <!-- <q-separator class="tw-bg-stone-800" /> -->
  <template v-for="item in items" :key="item.title">
    <template v-if="item.children && item.children.length > 0">
      <q-expansion-item
        v-model="item.open"
        :label="item.title"
        :header-class="
          'tw-font-medium ' + (item.open ? 'tw-text-black' : 'tw-text-gray-600')
        "
        :header-inset-level="insetLevel"
        :icon="item.icon"
      >
        <MenuItem :items="item.children" :level="level + 1"></MenuItem>
      </q-expansion-item>
    </template>
    <template v-else>
      <q-item
        v-ripple
        clickable
        :active="item.open"
        :inset-level="insetLevel"
        class="tw-text-gray-600 tw-font-medium"
        active-class="tw-text-red-400"
        @click="handleRouter(item)"
      >
        <q-item-section avatar>
          <q-icon :name="item.icon" />
        </q-item-section>

        <q-item-section>{{ item.title }} {{ item.open }}</q-item-section>
      </q-item>
    </template>
  </template>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';
  import { Menu } from '@/types/menu';
  import { useRouter } from 'vue-router';

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
  const router = useRouter();
  function handleRouter(item: Menu) {
    if (item.router) {
      router.push(item.router);
    }
  }
</script>
