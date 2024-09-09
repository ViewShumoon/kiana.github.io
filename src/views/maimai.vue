<template>
    <RedirectTo :url="url" :mode="RedirectToMode.SELF"/>
</template>

<script setup lang="ts">
import { RedirectToMode } from '@types/RedirectToMode';

const url = "https://www.diving-fish.com/maimaidx/prober/";

</script>

<style scoped>

</style>
