import { defineStore } from 'pinia'
import { TimeSection, type DateTimeSection } from '@/types/TimeSection';

// export const useTimeSectionStore = defineStore('timeSection', {
//     state: () => ({
//         timeSections: [] as TimeSection[],
//     }),
//     actions: {
//         addTimeSection(timeRange: TimeSection) {
//             this.timeSections.push(timeRange);
//             //localStorage.setItem('timeSection', JSON.stringify(this.timeSections));
//         },
//         removeTimeSection(index: number) {
//             this.timeSections.splice(index, 1);
//             //localStorage.setItem('timeSection', JSON.stringify(this.timeSections));
//         }
//     },
//     persist: {
//         storage: sessionStorage,
//     },
// });

export const useDateTimeSectionStore = defineStore('timeSection', {
    state: () => ({
        dateTimeSection: {} as DateTimeSection,
    }),
    getters: {
        GetTimeSectionByDate: (state) => {
            return (date: string) => state.dateTimeSection[date] || [];
        },
    },
    actions: {
        addTimeSection(date: string, timeRange: TimeSection) {
            if (!this.dateTimeSection[date]) {
                this.dateTimeSection[date] = [];
            }

            this.dateTimeSection[date].push(timeRange);
        },
        removeTimeSection(date: string, index: number) {
            if (!this.dateTimeSection[date]) {
                window.$message.error("未找到数据")
                return;
            }

            this.dateTimeSection[date].splice(index, 1);
        }
    },
    persist: {
        storage: localStorage,
    },
});

export default useDateTimeSectionStore;
