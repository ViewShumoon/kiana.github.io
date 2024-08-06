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
