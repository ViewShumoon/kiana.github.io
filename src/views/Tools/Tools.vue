<template>
  <div>
    <Menus :menus="menuOptions" />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Menus from '@/components/Menus.vue'
import { RouterLink } from 'vue-router';
import { h } from 'vue';
import { type MenuOption } from 'naive-ui'

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: { name: 'Random' },
        },
        { default: () => '随机' }
      ),
    key: 'Random',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: { name: 'TimeInterval' },
        },
        { default: () => '时间区间' }
      ),
    key: 'TimeInterval',
  },
];
</script>

<style scoped>

.tools-content {
  padding: 24px 0 0 0;
}
</style> 