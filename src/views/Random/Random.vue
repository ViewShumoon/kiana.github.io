<template>
    <Menus :menus="menuOptions"></Menus>
    <RouterView></RouterView>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { type MenuOption } from 'naive-ui'

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
