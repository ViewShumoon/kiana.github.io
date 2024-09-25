<template>
    <n-card title="时间区间">
        <n-flex justify="space-between">
            <n-flex>
                <n-button type="primary" @click="AddInterval">添加一项</n-button>
            </n-flex>

            <n-space>
                <n-date-picker v-model:value="currentDate.milliseconds" type="date" />
            </n-space>
        </n-flex>

        <n-divider></n-divider>
        <n-data-table :columns="columns" :data="dateTimeInterval[currentDate.toString()]" :bordered="true"
            :row-key="(row) => row.id" v-model:checked-row-keys="selectedRowKeys"
            @update:checked-row-keys="OnSelectRow">
        </n-data-table>


        <template #footer v-if="selectedRowKeys.length > 0">
            <div class="ms-1 my-3">
                <n-flex>
                    <div v-if="selectedRowKeys.length > 0" class="fs-6  my-1">
                        选择 {{ selectedRowKeys.length }} 项, 总区间大小: {{ totalDuration.toFixed(2) }} 小时
                    </div>
                    <div class="mx-3"></div>
                    <div>
                        总大小
                        <n-input-number class="inline-input" v-model:value="restTotalCount" :show-button="false" min="0"
                            max="65535" />
                        - 当前大小 {{ totalDuration.toFixed(2) }} =
                        <span class="ms-2 fs-5" style="color: var(--n-color-target)"><!-- #63e2b7 -->
                            {{ CalculateTotalInterval() }} 小时
                        </span>
                    </div>
                </n-flex>
            </div>
            <!-- <n-grid class="mx-1"  x-gap="12" :cols="2">
                
            </n-grid> -->

        </template>
    </n-card>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { TimeInterval } from '@/types/TimeInterval';
import { DateOnly } from '@/types/DateOnly';
import { useDateTimeIntervalStore } from '@/stores/TimeIntervalStore';
import { NButton, NInput, NTimePicker, type DataTableColumns, type DataTableRowKey } from 'naive-ui';

const showModal = ref<boolean>(false);
const restTotalCount = ref<number>(0);

const currentDate = ref<DateOnly>(DateOnly.now());

const store = useDateTimeIntervalStore();
const { dateTimeInterval } = storeToRefs(store)

const columns: DataTableColumns<TimeInterval> = [
    {
        type: 'selection',
    },
    {
        title: '内容',
        key: 'content',
        //<n-input v-model:value="item.content" placeholder="内容" />
        render(row, index) {
            return h(
                NInput, {
                value: row.content,
                placeholder: '内容',
                onUpdateValue: (value) => {
                    row.content = value;
                }
            }
            )
        }
    },
    {
        title: '开始时间',
        key: 'start',
        //<n-time-picker format="HH:mm" v-model:value="item.start" placeholder="开始时间" />
        render(row, index) {
            return h(
                NTimePicker, {
                format: 'HH:mm',
                value: row.start,
                placeholder: '开始时间',
                onUpdateValue: (value) => {
                    row.start = value;
                }
            }
            )
        }
    },
    {
        title: '结束时间',
        key: 'end',
        //<n-time-picker format="HH:mm" v-model:value="item.end" placeholder="结束时间" />
        render(row, index) {
            return h(
                NTimePicker, {
                format: 'HH:mm',
                value: row.end,
                placeholder: '结束时间',
                onUpdateValue: (value) => {
                    row.end = value;
                }
            }
            )
        }
    },
    {
        title: '区间大小',
        key: 'duration',
        //<span>{{ TimeInterval.GetTimeDuration(item.start, item.end)}} 小时</span>
        render(row, index) {
            return `${TimeInterval.GetTimeDuration(row.start, row.end)} 小时`;
        }
    },
    {
        title: '操作',
        key: 'actions',
        render(row, index) {
            return h(
                NButton,
                {
                    strong: true,
                    secondary: true,
                    type: "error",
                    onClick: () => DeleteInterval(index),
                },
                { default: () => '删除' }
            )
        },
    }
]

function AddInterval() {
    var newItem: TimeInterval = new TimeInterval(Date.now(), null);
    store.addTimeInterval(currentDate.value.toString(), newItem);
};

function DeleteInterval(index: number) {
    store.removeTimeInterval(currentDate.value.toString(), index);
}

function CalculateTotalInterval(): string {
    const result = restTotalCount.value - totalDuration.value;
    if (result > 0) {
        return result.toFixed(2);
    }
    else {
        return "0.00"
    }
}

const selectedRowKeys = ref<DataTableRowKey[]>([]);
const totalDuration = ref<number>(0);
function OnSelectRow(rowKeys: DataTableRowKey[]) {
    selectedRowKeys.value = rowKeys;

    const selectedItems = rowKeys.map((key) => dateTimeInterval.value[currentDate.value.toString()].find((item) => item.id === key))

    let totalResult = 0;
    selectedItems.forEach(item => {
        if (item) {
            totalResult += TimeInterval.GetTimeDuration(item.start, item.end);
        };
    });

    totalDuration.value = totalResult;
}




</script>

<style scoped>
.inline-input {
    display: inline-block;
    width: 4rem;
}
</style>
