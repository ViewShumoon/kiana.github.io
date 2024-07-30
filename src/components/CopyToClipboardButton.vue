<template>
    <n-button strong secondary type="primary" @click="onCopyButtonClicked(props.value)">
        <slot></slot>
    </n-button>
</template>

<script setup lang="ts">
const props = defineProps(['value'])

function onCopyButtonClicked(value: string) {
    navigator.clipboard.writeText(value).then(() => {
        window.$message.success('复制成功');
    })

}


</script>

<style scoped></style>
