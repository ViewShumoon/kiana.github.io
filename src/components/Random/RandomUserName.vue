<template>
    <n-card title="随机账号名称生成器">
        <n-form :model="generateOptionsRef" label-placement="left" label-width="auto" size="large">
            <n-grid cols="4">
                <n-grid-item span="2">
                    <n-form-item label="语言">
                        <n-select v-model:value="generateOptionsRef.language" :options="languageModeMenus" />
                    </n-form-item>
                    <n-form-item label="首字母大写">
                        <n-switch v-model:value="generateOptionsRef.capitalizeFirst" />
                    </n-form-item>
                    <n-form-item label="划线分割">
                        <n-switch v-model:value="generateOptionsRef.dashStriped" />
                    </n-form-item>
                    <n-form-item label="使用完整词语">
                        <n-switch v-model:value="generateOptionsRef.useFullWords" />
                    </n-form-item>
                </n-grid-item>
                <n-grid-item span="2">
                    <n-form-item label="词语个数">
                        <n-input-number v-model:value="generateOptionsRef.wordCount" :min="1" :max="8" />
                    </n-form-item>
                    <n-form-item label="生成数量">
                        <n-input-number v-model:value="generateOptionsRef.generateCount" :min="1" :max="64" />
                    </n-form-item>
                </n-grid-item>
            </n-grid>

            <n-form-item>
                <n-button type="primary" size="large" @click="generateNames">生成</n-button>
            </n-form-item>
        </n-form>
        <n-divider />
        <n-table :bordered="false" :single-line="false">
            <tbody>
                <tr v-for="(value, index) in generatedNamesRef" :key="index">
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
    </n-card>
</template>

<script setup lang="ts">
/*
请你帮我生成一个根据参数生成随机账号名称的vue页面，
参数包括

- 生成名称的语言 
    - 中文
    - 英文
    - 俄语
    - 法语
    - 日语
    - 纯随机

- 从结果中排除的字符列表

- 是否首字母大写
- 生成所用的词语的个数
- 是否使用完整词语

项目使用 Vite 的 Vue 3，使用 TypeScript, 页面使用 naive-ui

原理是随机从预设的词语列表中随机选取参数中指定个数的词语，如果参数中使用完整词语就不截取，如果不使用完整词语就将词语截取一半左右，然后将词语拼接起来
*/

import wordlist from '@/components/Random/UserName';
import { LanguageMode, type RandomUserNameGenerateOptions } from '@/types/Random';
import type { SelectOption } from 'naive-ui/es/select/src/interface';


const languageModeMenus: SelectOption[] = [
    { value: LanguageMode.english, label: '英文' },
    { value: LanguageMode.chinese, label: '中文' }
];

const generateOptionsRef = ref<RandomUserNameGenerateOptions>({
    language: LanguageMode.english,

    capitalizeFirst: true,
    useFullWords: false,
    dashStriped: false,

    wordCount: 3,
    generateCount: 4
});

const wordsMap: Map<LanguageMode, string[]> = new Map<LanguageMode, string[]>([
    [LanguageMode.english, wordlist.get('english')!]
]);

const generatedNamesRef = ref<string[]>([]);

generateNames();

function generateNames() {
    const results = Array.from({ length: generateOptionsRef.value.generateCount }, () => generateRandomName(generateOptionsRef.value));
    generatedNamesRef.value = results
}

function generateRandomName(options: RandomUserNameGenerateOptions): string {
    let words = wordsMap.get(options.language)!;

    let result = '';
    for (let i = 0; i < options.wordCount; i++) {
        let word = words[Math.floor(Math.random() * words.length)];
        if (!options.useFullWords) {
            word = word.slice(0, Math.floor(word.length / 2));
        }
        if (options.dashStriped && i < options.wordCount - 1) {
            word += '-';
        }
        result += word;
    }

    if (options.capitalizeFirst) {
        result = result.charAt(0).toUpperCase() + result.slice(1);
    }

    return result;
}

function onCopyButtonClicked(value: string)
{
    navigator.clipboard.writeText(value).then(()=>{
        window.$message.success('复制成功');
    })

}

</script>
