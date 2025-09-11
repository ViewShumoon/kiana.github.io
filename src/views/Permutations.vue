<template>
    <n-card title="排列组合" class="card">
        <n-form :model="optionsRef" label-placement="left" label-width="90" size="large">
            <n-grid cols="4">
                <n-grid-item span="3">
                    <n-form-item label="元素列表">
                        <n-dynamic-input style="min-width: 5rem;" v-model:value="optionsRef.elements" placeholder="请输入" :min="2" :max="999" />
                    </n-form-item>
                    
                </n-grid-item>
                <n-grid-item span="3">
                    <n-form-item label="组合大小">
                        <n-input-number v-model:value="optionsRef.size" :min="1" :max="999" />
                    </n-form-item>
                </n-grid-item>
            </n-grid>

            <n-form-item>
                <n-button type="primary" size="large" @click="generatePermutations" :loading="isGenerating">
                    {{ isGenerating ? '生成中...' : '生成' }}
                </n-button>
            </n-form-item>
        </n-form>
        <n-divider />

        <!-- 结果 -->
        <div v-if="tableDataRef.length > 0">
            <h3>
                共 {{ tableDataRef.length }} 个
                <CopyToClipboardButton class="ms-2" :value="allPermutationsString">
                    复制所有
                </CopyToClipboardButton>
            </h3>
            <n-data-table
                :columns="columns"
                :data="tableDataRef"
                :pagination="false"
                :bordered="false"
                :loading="isGenerating"
                max-height="1200"
                virtual-scroll
            />
        </div>
    </n-card>
</template>

<script setup lang="ts">

import type { PermutationsGenerateOptions } from '@/types/Permutations';
import { ref, reactive, computed, h } from 'vue';
import type { DataTableColumns } from 'naive-ui';

const optionsRef = ref<PermutationsGenerateOptions>({
    elements: ["汉", "堡"],
    size: 3,
});

const tableDataRef = ref<RowData[]>([]);


// DataTable 配置
interface RowData {
  key: string
}
const columns: DataTableColumns<RowData> = [
    {
        title: '结果',
        key: 'key',
        render: (rowData) => rowData.key
    }
];


async function generatePermutations() {
    isGenerating.value = true;
    
    const elements = optionsRef.value.elements.map(s => s.trim()).filter(s => s.length > 0);
    
    if (elements.length === 0) {
        return;
    }

    
    tableDataRef.value = [];

    try {
        const generator = PermutationGenerator.generatePermutationsWithRepetitionAsync(elements, optionsRef.value.size);
        
        for await (const permutation of generator) {
            const line = permutation.join('');
            tableDataRef.value.push({ key: line });
        }

    } finally {
        isGenerating.value = false;
    }
}

class PermutationGenerator {
    /**
     * 异步生成给定元素集合的可重复排列。
     * @param elements 用于生成排列的元素数组。
     * @param size 每个排列的长度（即要组合的大小）。
     * @returns 一个异步生成器，逐个产生排列结果。
     */
    public static async *generatePermutationsWithRepetitionAsync<T>(elements: T[], size: number): AsyncGenerator<T[], void, unknown> {
        // 如果输入元素为空或没有元素，则无法生成排列。
        if (!elements || elements.length === 0) {
            return;
        }

        // 如果组合大小为0，则只有一个"空排列"，即一个空数组。
        if (size === 0) {
            yield [];
            return;
        }

        // 如果组合大小为负数，则返回空。
        if (size < 0) {
            return;
        }

        // 用于在递归过程中构建当前排列。预先分配大小以提高效率。
        const currentPermutation: T[] = new Array(size);

        // 调用异步递归辅助方法来生成排列。
        yield* PermutationGenerator.generatePermutationsRecursiveAsync(elements, size, 0, currentPermutation);
    }

    /**
     * 异步递归辅助方法，用于生成可重复排列。
     * @param elements 用于生成排列的元素数组。
     * @param size 目标排列的长度。
     * @param currentIndex 当前正在填充的排列中的索引。
     * @param currentPermutation 当前正在构建的排列。
     */
    private static async *generatePermutationsRecursiveAsync<T>(
        elements: T[],
        size: number,
        currentIndex: number,
        currentPermutation: T[]): AsyncGenerator<T[], void, unknown> {
        // 基本情况：如果当前索引达到了目标大小，说明一个完整的排列已经构建完成。
        if (currentIndex === size) {
            yield [...currentPermutation];
            return;
        }

        // 递归步骤：遍历所有可能的元素，并将其放置在当前索引位置。
        for (let i = 0; i < elements.length; i++) {
            // 将当前元素放置在当前索引位置。
            currentPermutation[currentIndex] = elements[i];

            // 递归调用自身，处理排列中的下一个位置。
            yield* PermutationGenerator.generatePermutationsRecursiveAsync(elements, size, currentIndex + 1, currentPermutation);
        }
    }

    /**
     * 生成给定元素集合的可重复排列（同步版本，保留用于兼容性）。
     * @param elements 用于生成排列的元素数组。
     * @param size 每个排列的长度（即要组合的大小）。
     * @returns 一个包含所有生成排列的列表，每个排列是一个T类型的数组。
     */
    public static generatePermutationsWithRepetition<T>(elements: T[], size: number): T[][] {
        // 如果输入元素为空或没有元素，则无法生成排列，返回空列表。
        if (!elements || elements.length === 0) {
            return [];
        }

        // 如果组合大小为0，则只有一个"空排列"，即一个空数组。
        if (size === 0) {
            return [[]];
        }

        // 如果组合大小为负数，则返回空列表。
        if (size < 0) {
            return [];
        }

        // 用于存储所有生成的排列。
        const result: T[][] = [];
        // 用于在递归过程中构建当前排列。预先分配大小以提高效率。
        const currentPermutation: T[] = new Array(size);

        // 调用递归辅助方法来生成排列。
        PermutationGenerator.generatePermutationsRecursive(elements, size, 0, currentPermutation, result);

        return result;
    }

    /**
     * 递归辅助方法，用于生成可重复排列（同步版本）。
     * @param elements 用于生成排列的元素数组。
     * @param size 目标排列的长度。
     * @param currentIndex 当前正在填充的排列中的索引。
     * @param currentPermutation 当前正在构建的排列。
     * @param result 存储所有完整排列的列表。
     */
    private static generatePermutationsRecursive<T>(
        elements: T[],
        size: number,
        currentIndex: number,
        currentPermutation: T[],
        result: T[][]) {
        // 基本情况：如果当前索引达到了目标大小，说明一个完整的排列已经构建完成。
        // 将当前排列的副本添加到结果列表中。
        // 必须使用 .slice() 来添加副本，否则所有结果都会引用同一个数组，导致数据错误。
        if (currentIndex === size) {
            result.push([...currentPermutation]);
            return;
        }

        // 递归步骤：遍历所有可能的元素，并将其放置在当前索引位置。
        for (let i = 0; i < elements.length; i++) {
            // 将当前元素放置在当前索引位置。
            currentPermutation[currentIndex] = elements[i];

            // 递归调用自身，处理排列中的下一个位置。
            PermutationGenerator.generatePermutationsRecursive(elements, size, currentIndex + 1, currentPermutation, result);
        }
    }
}

const allPermutationsString = computed(() => {
    if (!tableDataRef.value || tableDataRef.value.length === 0) {
        return '';
    }

    return tableDataRef.value.map(e=>e.key).join('\n');
});

const isGenerating = ref(false);


generatePermutations();



</script>

<style scoped>
.result-section {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.result-section h3 {
    color: #333;
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 20px;
}

.permutation-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
}

.permutation-table th,
.permutation-table td {
    border: 1px solid #eee;
    padding: 10px;
    text-align: left;
}

.permutation-table th {
    background-color: #f2f2f2;
    font-weight: bold;
    color: #555;
}

.permutation-table tbody tr:nth-child(even) {
    background-color: #f9f9f9;
}

.permutation-table tbody tr:hover {
    background-color: #e9ecef;
}
</style>
