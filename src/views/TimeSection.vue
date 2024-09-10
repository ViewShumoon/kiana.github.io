<template>
    <n-card title="时间区间">
        <n-space justify="space-between">
            <n-button @click="AddSection">添加一项</n-button>
            <n-space>
                <n-date-picker v-model:value="currentDate.milliseconds" type="date"/>
            </n-space>
        </n-space>


        <n-divider></n-divider>
        <n-table :bordered="true">
            <thead>
                <tr>
                    <th>内容</th>
                    <th>开始时间</th>
                    <th>结束时间</th>
                    <th>区间大小</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(section, index) in dateTimeRangeStore.GetTimeSectionByDate(currentDate.toString())" :key="index">
                    <td>
                        <n-input v-model:value="section.content" placeholder="内容" />
                    </td>
                    <td>
                        <n-time-picker format="HH:mm" v-model:value="section.start" placeholder="开始时间" />
                    </td>
                    <td>
                        <n-time-picker format="HH:mm" v-model:value="section.end" placeholder="结束时间" />
                    </td>
                    <td>
                        <span>{{ TimeSection.GetTimeDuration(section.start, section.end)}} 小时</span>
                    </td>
                    <td>
                        <n-button strong secondary type="error" attr-type="button" @click="DeleteSection(index)">
                            删除
                        </n-button>
                    </td>
                </tr>
            </tbody>
        </n-table>
    </n-card>
</template>

<script setup lang="ts">
import { TimeSection } from '@/types/TimeSection';
import useDateTimeSectionStore from '@/stores/TimeSectionStore';
import { DateOnly } from '@/types/DateOnly';

const currentDate = ref<DateOnly>(DateOnly.now());



const dateTimeRangeStore = useDateTimeSectionStore();

//const sectionsRef = ref<TimeSection[]>([]);

function AddSection() {
    var newItem: TimeSection = new TimeSection(Date.now(), null);
    dateTimeRangeStore.addTimeSection(currentDate.value.toString(), newItem);
};

function DeleteSection(index: number) {
    dateTimeRangeStore.removeTimeSection(currentDate.value.toString(), index);
}

</script>

<style scoped></style>
