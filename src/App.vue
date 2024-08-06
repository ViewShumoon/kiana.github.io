<template>
  <n-config-provider :theme="darkTheme" :locale="zhCN" :date-locale="dateZhCN" wh-full>
    <WindowProvider>
        <RouterView />
    </WindowProvider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { darkTheme, zhCN, dateZhCN } from 'naive-ui'

</script>

<style scoped>

</style>
