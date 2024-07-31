请你帮我改造下面的vue代码，使其点击按钮时能使用 vue router导航至 "/"，页面使用 Naive UI，框架使用 Vite 的Vue3


<template>
    <n-space justify="center">
        <div>
            <div class="cry-face mb-4">
                :(
            </div>
            <n-space justify="center">
                <NButton strong secondary type="primary"  @click="navigateToHome">
                    回到首页
                </NButton>
            </n-space>
        </div>

    </n-space>

</template>

<script setup lang="ts">
import router from '@/services/router';


const navigateToHome = () => {
    router.push({ path: '/', replace: true });    
};

</script>

<style scoped>
.cry-face {
    font-family: "Microsoft YaHei UI", 'Segoe UI';
    font-size: 12rem;
}
</style>
