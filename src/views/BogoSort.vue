<template>
    <div class="sort-demo">
        <h1>猴子排序</h1>
        <div class="controls">
            <n-button-group>
                <n-button @click="startSort">开始</n-button>
                <n-button @click="pauseSort">暂停</n-button>
                <n-button @click="stepSort">步进</n-button>
            </n-button-group>
            <n-slider v-model:value="runningSpeed" :min="10" :max="100" :step="10" @update:value="updateSpeed" />
        </div>

        <div class="bars-container">
            <div class="bar" v-for="(value, index) in arrayRef" :key="index" :style="{ height: `${value * 5}px` }">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
/*
请你帮我生成一个 用于演示排序算法的页面，根据数组的内容，不断变动对应大小长度的长条的位置，可以开始，暂停，步进，调整演示速度
项目使用 Vite 的 Vue 3，使用 TypeScript, 页面使用 naive-ui

*/

const arrayRef = ref<number[]>([]);

const runningSpeed = ref(50);

let sortInterval: ReturnType<typeof setInterval> | null = null;
let isSorting = false;

onMounted(() => {
    generateRandomArray();
});

function generateRandomArray() {
    const size = 16;
    arrayRef.value = Array.from({ length: size }, () => Math.floor(Math.random() * size));
}

function startSort() {
    if (isSorting) return;
    isSorting = true;
    bogoSort(arrayRef.value);
}

function pauseSort() {
    if (sortInterval) {
        clearInterval(sortInterval);
        sortInterval = null;
        isSorting = false;
    }
}

function stepSort() {
    if (isSorting) return;
    isSorting = true;
    const newArray = [...arrayRef.value];
    bogoSortStep(newArray);
    arrayRef.value = newArray;
    isSorting = false;
}

function updateSpeed(value: number) {
    if (sortInterval) {
        clearInterval(sortInterval);
        sortInterval = setInterval(() => {
            const newArray = [...arrayRef.value];
            bogoSortStep(newArray);
            arrayRef.value = newArray;
        }, 1000 / value);
    }
}

function bogoSort(arr: number[]) {
    sortInterval = setInterval(() => {
        bogoSortStep(arr);
        arrayRef.value = arr;
    }, 1000 / runningSpeed.value);
}

function bogoSortStep(arr: number[]) {
    if (isSorted(arr)) {
        clearInterval(sortInterval as ReturnType<typeof setInterval>);
        sortInterval = null;
        isSorting = false;
        window.$message.success('排序完成!');
        return;
    }

    shuffle(arr);
}

// 判断是否排序完成
function isSorted(array: number[]) {
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1]) return false;
    }
    return true;
}

// 随机打乱数组
function shuffle(arr: number[]) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}
</script>

<style scoped>
.bars-container {
    display: flex;
    align-items: flex-end;
    height: 300px;
    width: 100%;
    max-width: 800px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.bar {
    flex-grow: 1;
    background-color: #4caf50;
    margin: 0 2px;
}
</style>
