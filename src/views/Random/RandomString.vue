<template>
    <n-card title="随机字符串生成器">
        <n-form :model="optionsRef" label-placement="left" label-width="auto" size="large">
            <n-grid cols="4">
                <n-grid-item span="2">
                    <n-form-item label="包含小写字母">
                        <n-switch v-model:value="optionsRef.includeLowercase" />
                    </n-form-item>
                    <n-form-item label="包含大写字母">
                        <n-switch v-model:value="optionsRef.includeUppercase" />
                    </n-form-item>
                    <n-form-item label="包含数字">
                        <n-switch v-model:value="optionsRef.includeNumbers" />
                    </n-form-item>
                    <n-form-item label="包含特殊字符">
                        <n-switch v-model:value="optionsRef.includeSpecialChars" />
                    </n-form-item>
                </n-grid-item>

                <n-grid-item span="2">
                    <n-form-item label="生成字符串长度">
                        <n-input-number v-model:value="optionsRef.length" :min="1" :max="1024" />
                    </n-form-item>
                    <n-form-item label="生成数量">
                        <n-input-number v-model:value="optionsRef.generateCount" :min="1" :max="64" />
                    </n-form-item>
                </n-grid-item>
            </n-grid>

            <n-form-item label="排除的字符">
                <n-input v-model:value="optionsRef.excludeChars" placeholder="例如: 0O 1iI" />
            </n-form-item>

            <n-form-item>
                <n-button type="primary" size="large" @click="generateStrings">生成</n-button>
            </n-form-item>
        </n-form>
        <n-divider />
        <n-table :bordered="false" :single-line="false" striped>
            <tbody>
                <tr v-for="(value, index) in generatedResultsRef" :key="index">
                    <td>
                        <CopyToClipboardButton class="me-2" :value="value">
                            复制
                        </CopyToClipboardButton>
                        <n-divider vertical />
                        {{ value }}
                    </td>
                </tr>
            </tbody>
        </n-table></n-card>
</template>
<script setup lang="ts">
/*
请你帮我生成一个根据参数生成随机字符串的vue页面，
参数包括

    是否包含小写资费

    是否包含大写资费

    是否包含数字

    是否包含特殊字符

    从结果中排查的字符列表

    生成字符串的长度

    生成字符串的个数

项目使用 Vite 的 Vue 3，使用 TypeScript, 页面使用 naive-ui
*/

import type { RandomStringGenerateOptions } from '@/types/Random';


const optionsRef = ref<RandomStringGenerateOptions>({
    includeLowercase: true,
    includeUppercase: true,
    includeNumbers: true,
    includeSpecialChars: false,
    excludeChars: '',
    length: 16,
    generateCount: 4,
});

const generatedResultsRef = ref<string[]>([]);

generateStrings();

function generateStrings() {
    const result = Array.from({ length: optionsRef.value.generateCount }, () => generateRandomString(optionsRef.value));

    generatedResultsRef.value = result;
}

function generateRandomString(options: RandomStringGenerateOptions): string {
    let charset = getCharset(options);

    let result = '';
    for (let i = 0; i < options.length; i++) {
        result += charset[Math.floor(Math.random() * charset.length)];
    }

    return result;
}

function getCharset(options: RandomStringGenerateOptions): string {
    let charset = '';
    if (options.includeLowercase) {
        charset += 'abcdefghijklmnopqrstuvwxyz';
    }
    if (options.includeUppercase) {
        charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if (options.includeNumbers) {
        charset += '0123456789';
    }
    if (options.includeSpecialChars) {
        charset += '@#$_&-+()/*\"\':;!?';
    }
    charset = charset.split('').filter(c => !options.excludeChars.includes(c)).join('');
    return charset;
}
</script>

<style></style>
