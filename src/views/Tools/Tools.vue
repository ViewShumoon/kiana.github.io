<template>
    <n-layout>
        <n-layout-header>
            <div class="container d-flex p-1">
                <Menus :menus="menuOptions" :mode="'horizontal'" class="flex-fill" />
                <AccountLogin />
            </div>
        </n-layout-header>

        <n-layout>
            <n-layout-content>
                <router-view />
            </n-layout-content>
        </n-layout>
    </n-layout>
    <div class="container">

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

</style>
