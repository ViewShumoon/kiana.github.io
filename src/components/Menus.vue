<template>
    <n-menu v-model:value="activeKey" :options="menus" mode="horizontal" responsive/>
</template>

<script setup lang="ts">
import { type MenuOption } from 'naive-ui'
import { RouterLink } from 'vue-router';

const activeKey = ref<string | null>("RandomString")

defineProps<{
    menus?: MenuOption[]
}>()

</script>

<style scoped>

</style>
