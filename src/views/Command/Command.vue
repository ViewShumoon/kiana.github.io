<template>
    <Menus :menus="menuOptions"></Menus>
    <RouterView></RouterView>
</template>

<script setup lang="ts">
import Menus from '@/components/Menus.vue';
import type { MenuOption } from 'naive-ui';
import { RouterLink } from 'vue-router';

const menuOptions: MenuOption[] = [
{
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'CommandTarkov',
          }
        },
        { default: () => '塔科夫' }
      ),
    key: 'CommandTarkov'
  },

  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'CommandStarsector',
          }
        },
        { default: () => 'Starsector' }
      ),
    key: 'CommandStarsector'
  },
]

</script>

<style scoped>

</style>
