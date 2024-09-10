<template>
    <div>
        <h1>Timer List</h1>
       
        <div v-for="(sections, index) in sections" :key="index">
            <n-space>
                <n-time-picker v-model:value="sections.start"/>
                <n-time-picker v-model:value="sections.end"/>
            </n-space>
            
            <span>{{ sections.duration }} 小时</span>

            <!-- <n-button @click="removeTimer(0)">Remove</n-button> -->
        </div>
        <n-button @click="addTimer">Add Timer</n-button>
        
    </div>
</template>

<script setup lang="ts">
import type { TimeSection } from '@/types/TimeSection';

   
const sections = ref<TimeSection[]>([]);
function addTimer() {
    var newItem : TimeSection = {
        startTime: new Date(),
        endTime: null
    };
    sections.value.push(newItem);
};

</script>

<style scoped>

</style>
