<template>
    <n-tabs :value="activeKey" type="line" animated @update:value="handleTabChange">
        <n-tab v-for="tab in tabs" :key="tab.name" :name="tab.name">
            {{ tab.label }}
        </n-tab>
    </n-tabs>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

/**
 * 菜单项。
 *
 * name 要和目标路由的 name 一致，切换 tab 时按 name 跳转。
 */
type TabMenuItem = {
    label: string,
    name: string,
}

const props = defineProps<{
    tabs?: TabMenuItem[],
}>()

const route = useRoute()
const router = useRouter()

// 以当前路由为准，保证刷新、前进后退时 tab 高亮正确
const activeKey = computed(() => {
    const tabs = props.tabs ?? []
    const name = typeof route.name === 'string' ? route.name : ''

    // 命中的路由不在菜单里（例如父级路由）时，回退到第一项
    return tabs.some(tab => tab.name === name) ? name : tabs[0]?.name ?? null
})

function handleTabChange(name: string) {
    if (name === activeKey.value) return

    router.push({ name })
}
</script>

<style scoped></style>
