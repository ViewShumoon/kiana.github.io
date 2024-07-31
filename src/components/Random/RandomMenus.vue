<template>
    <n-menu
        v-model:value="activeKey"
        mode="horizontal"
        :options="menuOptions"
        responsive
      />
</template>

<script setup lang="ts">
import { type MenuOption } from 'naive-ui'
import { RouterLink } from 'vue-router';

const activeKey = ref<string | null>("RandomString")

const menuOptions: MenuOption[] = [ 
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'RandomString',
          }
        },
        { default: () => '随机字符串' }
      ),
    key: 'RandomString'
  },

  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'RandomUserName',
          }
        },
        { default: () => '随机用户名' }
      ),
    key: 'RandomUserName'
  },
]

</script>

<style scoped>

</style>
