<template>
  <div>
    <div class="tools-header">
      <Menus :menus="menuOptions" class="tools-header__menus" />
      <AccountLogin class="tools-header__login" />
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Menus from '@/components/Menus.vue'
import AccountLogin from '@/components/AccountLogin.vue'
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
  {
    label: () =>
      h(
        RouterLink,
        {
          to: { name: 'Permutations' },
        },
        { default: () => '排列组合' }
      ),
    key: 'Permutations',
  },
];
</script>

<style scoped>

.tools-header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.tools-header__menus {
  flex: 1;
  min-width: 0;
}

.tools-header__login {
    margin-right: 1rem;
}

.tools-content {
  padding: 24px 0 0 0;
}
</style> 
