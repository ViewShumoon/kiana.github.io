import { defineStore } from 'pinia'
import { TimeInterval, type DateTimeInterval } from '@/types/TimeInterval';

export const useDateTimeIntervalStore = defineStore('timeInterval', {
    state: () => ({
        dateTimeInterval: {} as DateTimeInterval,
    }),
    getters: {
        GetTimeIntervalByDate: (state) => {
            return (date: string) => state.dateTimeInterval[date] || [];
        },

        GetSum: (state) => {
            return (date: string) => {
                const datas = state.dateTimeInterval[date];
                if (!datas) {
                    return 0;
                }

                const totalSum = datas.reduce((sum, item) => {
                    const hours = TimeInterval.GetTimeDuration(item.start, item.end);
                    return sum + hours; //TODO: 存在精度问题
                }, 0);

                return totalSum;
            }
        },
    },
    actions: {
        addTimeInterval(date: string, timeInterval: TimeInterval) {
            if (!this.dateTimeInterval[date]) {
                this.dateTimeInterval[date] = [];
            }

            this.dateTimeInterval[date].push(timeInterval);
        },
        removeTimeInterval(date: string, index: number) {
            if (!this.dateTimeInterval[date]) {
                window.$message.error("未找到数据")
                return;
            }

            this.dateTimeInterval[date].splice(index, 1);
        }
    },
    persist: {
        storage: localStorage,
    },
});
