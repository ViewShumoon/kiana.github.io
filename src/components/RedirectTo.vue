<template>
    <div>

    </div>
</template>

<script setup lang="ts">
import { RedirectToMode } from '@/types/RedirectToMode';

const props = defineProps<{
    url: string,
    mode: RedirectToMode
}>()

let target: string;
switch(props.mode) {
    case RedirectToMode.SELF: {
        target = "_self"
        break;
    }
    case RedirectToMode.BLANK: {
        target = "_blank"
        break;
    }
}

window.open(props.url, target);

</script>

<style scoped>

</style>
