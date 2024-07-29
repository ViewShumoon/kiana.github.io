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
                        <n-input-number v-model:value="optionsRef.length" :min="1" :max="100" />
                    </n-form-item>
                    <n-form-item label="生成个数">
                        <n-input-number v-model:value="optionsRef.count" :min="1" :max="100" />
                    </n-form-item>
                </n-grid-item>
            </n-grid>

            <n-form-item label="排除的字符">
                <n-input v-model:value="optionsRef.excludeChars" placeholder="输入需要排除的字符" />
            </n-form-item>

            <n-form-item>
                <n-button secondary strong type="primary" size="large" @click="generateStrings">生成</n-button>
            </n-form-item>
        </n-form>

        <n-table :bordered="false" :single-line="false" striped>
            <!-- <thead>
                <tr>
                    <th>序号</th>
                    <th>随机字符串</th>
                </tr>
            </thead> -->
            <tbody>
                <tr v-for="(str, index) in generatedResultsRef" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ str }}</td>
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

import type { GenerateOptions } from '@/types/Random';


const optionsRef = ref<GenerateOptions>({
    includeLowercase: true,
    includeUppercase: true,
    includeNumbers: true,
    includeSpecialChars: false,
    excludeChars: '',
    length: 16,
    count: 4,
});

const generatedResultsRef = ref<string[]>([]);

function generateStrings() {
    const result = Array.from({ length: optionsRef.value.count }, () => generateRandomString(optionsRef.value));

    generatedResultsRef.value = result;
}

function generateRandomString(options: GenerateOptions): string {
    let charset = getCharset(options);

    let result = '';
    for (let i = 0; i < options.length; i++) {
        result += charset[Math.floor(Math.random() * charset.length)];
    }

    return result;
}

function getCharset(options: GenerateOptions): string {
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
