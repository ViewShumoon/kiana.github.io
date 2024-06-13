<template>
  <n-config-provider :theme="darkTheme">
    <WindowProvider>

        <HelloWorld msg="Vite + Vue" />
      
    </WindowProvider>
  </n-config-provider>

</template>

<script setup lang="ts">
import { darkTheme } from 'naive-ui'

import HelloWorld from './components/HelloWorld.vue'

</script>

<style scoped>

</style>
