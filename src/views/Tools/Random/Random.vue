<template>
    <div class="container p-2">
        <MenuTabs :tabs="menuOptions"></MenuTabs>
        <RouterView></RouterView>
    </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import MenuTabs from '@/components/MenuTabs.vue';

const menuOptions = [
    {
        label: '随机字符串',
        name: 'RandomString'
    },
    {
        label: '随机用户名',
        name: 'RandomUserName'
    },
    {
        label: '随机时间戳Id',
        name: 'RandomTimestampId'
    },
]

</script>

<style scoped>

:deep(.random-tools-form) {
    padding: 1.25rem;
    --bs-border-width: 3px;
    --bs-border-opacity: 1;
    border-color: rgba(var(--bs-dark-rgb), var(--bs-border-opacity));
    border-style: solid;
    border-radius: var(--bs-border-radius-lg);
    border-width: var(--bs-border-width) var(--bs-border-style) var(--bs-border-color);
}

</style>
