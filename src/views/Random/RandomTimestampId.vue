<template>
    <n-card title="随机ID生成器" class="card">
        <n-form :model="optionsRef" label-placement="left" label-width="120" size="large">
            <n-grid cols="4">
                <n-grid-item span="2">
                    <n-form-item label="前缀">
                        <n-input v-model:value="optionsRef.prefixString" placeholder="请输入前缀" />
                    </n-form-item>
                    <n-form-item label="时间戳类型">
                        <n-select v-model:value="optionsRef.timestampType" :options="timestampTypeMenus"
                            @update:value="onTimestampTypeUpdate" />
                        <!-- <n-radio-group v-model:value="timestampType">
                            <n-radio value="seconds">秒级时间戳</n-radio>
                            <n-radio value="milliseconds">毫秒级时间戳</n-radio>
                        </n-radio-group> -->
                    </n-form-item>
                </n-grid-item>
                <n-grid-item span="2">
                    <n-form-item label="后缀长度">
                        <n-input-number v-model:value="optionsRef.postfixLength" :min="0" :max="32" />
                    </n-form-item>
                    <n-form-item label="包含小写字母">
                        <n-switch v-model:value="optionsRef.includeLowercase" />
                    </n-form-item>
                    <n-form-item label="包含大写字母">
                        <n-switch v-model:value="optionsRef.includeUppercase" />
                    </n-form-item>
                </n-grid-item>
            </n-grid>

        </n-form>

        <n-divider />

        <div>
            <CopyToClipboardButton class="me-2" :value="generatedResultsRef">
                复制
            </CopyToClipboardButton>
            {{ generatedResultsRef }}
        </div>
    </n-card>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useNow } from '@vueuse/core'
import { TimestampType, type RandomTimestampIdGenerateOptions } from '@/types/Random';
import type { SelectOption } from 'naive-ui/es/select/src/interface';

const timestampTypeMenus: SelectOption[] = [
    { value: TimestampType.seconds, label: '秒' },
    { value: TimestampType.milliseconds, label: '毫秒' }
];

const optionsRef = ref<RandomTimestampIdGenerateOptions>({
    prefixString: '',
    timestampType: TimestampType.seconds,
    postfixLength: 4,
    includeLowercase: true,
    includeUppercase: false
});

const generatedResultsRef = ref<string>();

// let updateCount = 0;
// let updateThreshold = 1000;

// 缓存字符集
const charsetDictionary = new Map<number, string>();

const now = useNow();

generateId();

function generateId() {
    const timestamp = optionsRef.value.timestampType === TimestampType.seconds
        ? Math.floor(now.value.getTime() / 1000)
        : now.value.getTime()

    const randomStr = generateRandomString(optionsRef.value);
    generatedResultsRef.value = `${optionsRef.value.prefixString}${timestamp}${randomStr}`
}

function generateRandomString(options: RandomTimestampIdGenerateOptions): string {
    let charset = getCharset(options);

    let result = '';
    for (let i = 0; i < options.postfixLength; i++) {
        result += charset[Math.floor(Math.random() * charset.length)];
    }

    return result;
}

function getCharset(options: RandomTimestampIdGenerateOptions): string {
    // 生成缓存键
    const cacheKey = (options.includeLowercase ? 1 : 0) | (options.includeUppercase ? 2 : 0);

    // 如果缓存中存在，直接返回
    if (charsetDictionary.has(cacheKey)) {
        return charsetDictionary.get(cacheKey)!;
    }

    let charset = '';
    if (options.includeLowercase) {
        charset += 'abcdefghijklmnopqrstuvwxyz';
    }
    if (options.includeUppercase) {
        charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    // if (options.includeNumbers) {
    //     charset += '0123456789';
    // }
    // if (options.includeSpecialChars) {
    //     charset += '@#$_&-+()/*\"\':;!?';
    // }
    // charset = charset.split('').filter(c => !options.excludeChars.includes(c)).join('');

    // 将结果存入缓存
    charsetDictionary.set(cacheKey, charset);
    return charset;
}

// 监听时间变化
watch(now, () => {
    generateId();

    // if (updateCount >= 50) {
    //     generateId();
    //     updateCount = 0;
    // }

    // updateCount++;
}, { immediate: true });


function onTimestampTypeUpdate() {
    // updateThreshold = optionsRef.value.timestampType === TimestampType.seconds ? 1000 : 100;
    generateId();
}

;
</script>

<style scoped></style>
