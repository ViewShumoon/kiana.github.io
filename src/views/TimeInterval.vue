<template>
    <n-card title="时间区间">
        <n-space justify="space-between">
            <n-button type="primary" @click="AddInterval">添加一项</n-button>
            <n-space>
                <!-- <div> {{ store.GetSum(currentDate.toString()).toFixed(2) }} </div> -->
                <n-date-picker v-model:value="currentDate.milliseconds" type="date" />
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
                <tr v-for="(item, index) in dateTimeInterval[currentDate.toString()]" :key="index">
                    <td>
                        <n-input v-model:value="item.content" placeholder="内容" />
                    </td>
                    <td>
                        <n-time-picker format="HH:mm" v-model:value="item.start" placeholder="开始时间" />
                    </td>
                    <td>
                        <n-time-picker format="HH:mm" v-model:value="item.end" placeholder="结束时间" />
                    </td>
                    <td>
                        <span>{{ TimeInterval.GetTimeDuration(item.start, item.end)}} 小时</span>
                    </td>
                    <td>
                        <n-button strong secondary type="error" attr-type="button" @click="DeleteInterval(index)">
                            删除
                        </n-button>
                    </td>
                </tr>
            </tbody>
        </n-table>
    </n-card>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { TimeInterval } from '@/types/TimeInterval';
import { DateOnly } from '@/types/DateOnly';
import {  useDateTimeIntervalStore } from '@/stores/TimeIntervalStore';

const currentDate = ref<DateOnly>(DateOnly.now());

const store = useDateTimeIntervalStore();

const { dateTimeInterval } = storeToRefs(store)

function AddInterval() {
    var newItem: TimeInterval = new TimeInterval(Date.now(), null);
    store.addTimeInterval(currentDate.value.toString(), newItem);
};

function DeleteInterval(index: number) {
    store.removeTimeInterval(currentDate.value.toString(), index);
}

</script>

<style scoped></style>
