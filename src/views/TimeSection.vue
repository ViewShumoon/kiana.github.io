<template>
    <div>
        <h1>Timer List</h1>
       
        <div v-for="section in sectionsRef">
            <n-space>
                <n-time-picker format="HH:mm" v-model:value="section.start"/>
                <n-time-picker format="HH:mm" v-model:value="section.end"/>
                       
                <span>{{ section.duration }} 小时</span>
            </n-space>
     

            <!-- <n-button @click="removeTimer(0)">Remove</n-button> -->
        </div>
        <n-button @click="addSection">Add Section</n-button>
        
    </div>
</template>

<script setup lang="ts">
import { TimeSection } from '@/types/TimeSection';

   
const sectionsRef = ref<TimeSection[]>([]);

function addSection() {
    var newItem : TimeSection = new TimeSection(Date.now(), null);
    sectionsRef.value.push(newItem);
};

</script>

<style scoped>

</style>
