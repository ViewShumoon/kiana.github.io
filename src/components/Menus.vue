<template>
    <n-menu v-model:value="activeKey" :options="menus" :mode="mode" responsive/>
</template>

<script setup lang="ts">
import { type MenuOption } from 'naive-ui'
import { RouterLink } from 'vue-router';

const activeKey = ref<string | null>("RandomString")

defineProps<{
    menus?: MenuOption[],
    mode?: "horizontal" | "vertical"
}>()

</script>

<style scoped>

</style>
