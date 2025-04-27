<template>
    <n-card title="随机ID生成器" class="card">
        <n-form :model="optionsRef" label-placement="left" label-width="120" size="large">
            <n-grid cols="4">
                <n-grid-item span="2">
                    <n-form-item label="前缀">
                        <n-input v-model:value="optionsRef.prefixString" placeholder="请输入前缀" />
                    </n-form-item>
                    <n-form-item label="时间戳类型">
                        <n-select v-model:value="optionsRef.timestampType" :options="timestampTypeMenus" />
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

let timer: number | null = null;

function generateId() {
    const timestamp = optionsRef.value.timestampType === TimestampType.seconds
        ? Math.floor(Date.now() / 1000)
        : Date.now()

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
    return charset;
}

function startAutoGenerate() {
    // 清除现有的定时器
    if (timer) {
        clearInterval(timer);
    }

    // 根据时间戳类型设置不同的刷新间隔
    const interval = optionsRef.value.timestampType === TimestampType.seconds ? 1000 : 100;
    
    // 立即执行一次
    generateId();
    
    // 设置定时器
    timer = setInterval(generateId, interval);
}

// 组件挂载时启动自动生成
onMounted(() => {
    startAutoGenerate();
});

// 组件卸载时清除定时器
onUnmounted(() => {
    if (timer) {
        clearInterval(timer);
    }
});

// 监听时间戳类型变化
watch(() => optionsRef.value.timestampType, () => {
    startAutoGenerate();
});
</script>

<style scoped></style>
