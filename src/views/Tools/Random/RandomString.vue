<template>
    <n-form class="mt-3 random-tools-form" :model="optionsRef" label-placement="left" label-width="auto" size="large">
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
                <n-form-item label="精简密码">
                    <n-switch v-model:value="optionsRef.compactMode" />
                    <n-text v-if="optionsRef.compactMode" class="ms-3" depth="3">
                        大写字母、特殊字符只在开头各生成 1 个，数字放在末尾，其余为小写字母
                    </n-text>
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

        <n-button type="primary" size="large" @click="generateStrings">生成</n-button>
     
    </n-form>
    <n-table class="mt-4" :bordered="false" :single-line="false" striped>
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
    </n-table>
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


const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBER_CHARS = '0123456789';
const SPECIAL_CHARS = '@#$_&-+()/*\"\':;!?';

const optionsRef = ref<RandomStringGenerateOptions>({
    includeLowercase: true,
    includeUppercase: true,
    includeNumbers: true,
    includeSpecialChars: false,
    excludeChars: '',
    length: 16,
    generateCount: 4,
    compactMode: true,
});

const generatedResultsRef = ref<string[]>([]);

generateStrings();

function generateStrings() {
    const result = Array.from({ length: optionsRef.value.generateCount }, () => generateRandomString(optionsRef.value));

    generatedResultsRef.value = result;
}

function generateRandomString(options: RandomStringGenerateOptions): string {
    if (options.compactMode) {
        return generateCompactString(options);
    }

    let charset = getCharset(options);

    let result = '';
    for (let i = 0; i < options.length; i++) {
        result += charset[Math.floor(Math.random() * charset.length)];
    }

    return result;
}

// 精简密码模式：大写字母、特殊字符只在开头各生成 1 个，数字集中在末尾，中间为小写字母
function generateCompactString(options: RandomStringGenerateOptions): string {
    let prefix = '';

    if (options.includeUppercase) {
        prefix += pickRandom(removeExcludedChars(UPPERCASE_CHARS, options));
    }
    if (options.includeSpecialChars) {
        prefix += pickRandom(removeExcludedChars(SPECIAL_CHARS, options));
    }

    const lowercaseCharset = removeExcludedChars(LOWERCASE_CHARS, options);
    const numberCharset = removeExcludedChars(NUMBER_CHARS, options);

    const canUseLowercase = options.includeLowercase && lowercaseCharset.length > 0;
    const canUseNumbers = options.includeNumbers && numberCharset.length > 0;

    const remaining = Math.max(options.length - prefix.length, 0);

    // 末尾数字约占剩余长度的三分之一；小写字母不可用时剩余长度全部使用数字
    let numberCount = 0;
    if (canUseNumbers) {
        numberCount = Math.min(canUseLowercase ? Math.max(1, Math.ceil(remaining / 3)) : remaining, remaining);
    }

    const letterCount = remaining - numberCount;
    // 小写字母与数字都不可用时，回退到完整字符集填充中间部分
    const letterCharset = canUseLowercase ? lowercaseCharset : getCharset(options);

    let result = prefix;
    for (let i = 0; i < letterCount; i++) {
        result += pickRandom(letterCharset);
    }
    for (let i = 0; i < numberCount; i++) {
        result += pickRandom(numberCharset);
    }

    return result.slice(0, options.length);
}

function pickRandom(charset: string): string {
    if (charset.length === 0) {
        return '';
    }

    return charset[Math.floor(Math.random() * charset.length)];
}

function removeExcludedChars(charset: string, options: RandomStringGenerateOptions): string {
    if (!options.excludeChars) {
        return charset;
    }

    return charset.split('').filter(c => !options.excludeChars.includes(c)).join('');
}

function getCharset(options: RandomStringGenerateOptions): string {
    let charset = '';
    if (options.includeLowercase) {
        charset += LOWERCASE_CHARS;
    }
    if (options.includeUppercase) {
        charset += UPPERCASE_CHARS;
    }
    if (options.includeNumbers) {
        charset += NUMBER_CHARS;
    }
    if (options.includeSpecialChars) {
        charset += SPECIAL_CHARS;
    }
    charset = charset.split('').filter(c => !options.excludeChars.includes(c)).join('');
    return charset;
}
</script>

<style></style>
