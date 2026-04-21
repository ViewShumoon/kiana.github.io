<template>
    <n-card title="随机账号名称生成器">
        <n-form :model="generateOptionsRef" label-placement="left" label-width="auto" size="large">
            <n-grid cols="4">
                <n-grid-item span="2">
                    <n-form-item label="首字母大写">
                        <n-switch v-model:value="generateOptionsRef.capitalizeFirst" />
                    </n-form-item>
                    <n-form-item label="音节数量">
                        <n-input-number v-model:value="generateOptionsRef.syllableCount" :min="2" :max="32" />
                    </n-form-item>
                </n-grid-item>
                <n-grid-item span="2">
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
        <n-table :bordered="false" :single-line="false" striped>
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

- 从结果中排除的字符列表

- 是否首字母大写
- 生成所用的词语的个数
- 是否使用完整词语

项目使用 Vite 的 Vue 3，使用 TypeScript, 页面使用 naive-ui

原理是随机从预设的词语列表中随机选取参数中指定个数的词语，如果参数中使用完整词语就不截取，如果不使用完整词语就将词语截取一半左右，然后将词语拼接起来
*/

import type { RandomUserNameGenerateOptions } from '@/types/Random';

const generateOptionsRef = ref<RandomUserNameGenerateOptions>({
    capitalizeFirst: true,
    syllableCount: 4,
    generateCount: 8
});

const generatedNamesRef = ref<string[]>([]);

generateNames();

function generateNames() {
    const results = Array.from({ length: generateOptionsRef.value.generateCount }, () => 
        generateRandomName(generateOptionsRef.value)
    );
    generatedNamesRef.value = results
}

function generateRandomName(options: RandomUserNameGenerateOptions): string {
    // 浏览器兼容的 phonetic 随机用户名生成实现
    return generatePhoneticName({
        syllables: options.syllableCount,
        capitalize: options.capitalizeFirst
    });
}

// 浏览器兼容的语音名称生成器
function generatePhoneticName(options: { syllables: number; capitalize: boolean }): string {
    const PHONETIC_PRE = [
        'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p',
        'qu', 'r', 's', 't',
        'bl', 'ch', 'cl', 'cr', 'dr', 'fl', 'fr', 'gl', 'gr', 'kl', 'kr',
        'ph', 'pr', 'pl', 'sc', 'sh', 'sl', 'sn', 'sr', 'st', 'str', 'sw',
        'th', 'tr', 'br', 'v', 'w', 'y', 'z'
    ];
    
    const PHONETIC_MID = [
        'a', 'e', 'i', 'o', 'u', 'ee', 'ie', 'oo', 'ou', 'ue'
    ];
    
    const PHONETIC_POST = [
        'b', 'd', 'f', 'g', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'y',
        'ch', 'ck', 'ln', 'nk', 'ng', 'rn', 'sh', 'sk', 'st', 'th', 'x', 'z'
    ];
    
    const REPLACEMENTS: Record<string, string> = {
        'quu': 'que',
        'qu([aeiou]){2}': 'qu$1',
        '[iu]y': 'ey',
        'eye': 'ye',
        '(.)ye$': '$1y',
        '(^|e)cie(?!$)': '$1cei',
        '([vz])$': '$1e',
        '[iu]w': 'ow'
    };
    
    const PHONETIC_PRE_SIMPLE_LENGTH = 16;
    const PHONETIC_MID_SIMPLE_LENGTH = 5;
    const PHONETIC_POST_SIMPLE_LENGTH = 13;
    
    // 浏览器兼容的随机数生成
    function getRandomBytes(length: number): number {
        const array = new Uint32Array(length);
        window.crypto.getRandomValues(array);
        return array[0];
    }
    
    // 简化的哈希函数
    function getNumericHash(data: string | number): number {
        let hash = 0;
        const str = data + '-Phonetic';
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash);
    }
    
    function getDerivative(num: number): number {
        let derivative = 1;
        while (num !== 0) {
            derivative += num % 7;
            num = Math.floor(num / 7);
        }
        return derivative;
    }
    
    function addSyllable(wordObj: any) {
        const deriv = getDerivative(wordObj.numeric);
        const compound = deriv % wordObj.opts.compoundSimplicity === 0;
        const first = wordObj.word === '';
        const preOnFirst = deriv % 6 > 0;
        
        if ((first && preOnFirst) || wordObj.lastSkippedPost || compound) {
            wordObj.word += getNextPhonetic(PHONETIC_PRE, PHONETIC_PRE_SIMPLE_LENGTH, wordObj);
            wordObj.lastSkippedPre = false;
        } else {
            wordObj.lastSkippedPre = true;
        }
        
        wordObj.word += getNextPhonetic(PHONETIC_MID, PHONETIC_MID_SIMPLE_LENGTH, wordObj, first && wordObj.lastSkippedPre);
        
        if (wordObj.lastSkippedPre || compound) {
            wordObj.word += getNextPhonetic(PHONETIC_POST, PHONETIC_POST_SIMPLE_LENGTH, wordObj);
            wordObj.lastSkippedPost = false;
        } else {
            wordObj.lastSkippedPost = true;
        }
    }
    
    function getNextPhonetic(phoneticSet: string[], simpleCap: number, wordObj: any, forceSimple = false): string {
        const deriv = getDerivative(wordObj.numeric);
        const simple = (wordObj.numeric + deriv) % wordObj.opts.phoneticSimplicity > 0;
        const cap = simple || forceSimple ? simpleCap : phoneticSet.length;
        const phonetic = phoneticSet[wordObj.numeric % cap];
        wordObj.numeric = getNumericHash(wordObj.numeric + wordObj.word);
        return phonetic;
    }
    
    function capFirst(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    function postProcess(wordObj: any): string {
        for (const regex in REPLACEMENTS) {
            if (REPLACEMENTS.hasOwnProperty(regex)) {
                const reg = new RegExp(regex);
                wordObj.word = wordObj.word.replace(reg, REPLACEMENTS[regex]);
            }
        }
        if (wordObj.opts.capFirst) {
            return capFirst(wordObj.word);
        }
        return wordObj.word;
    }
    
    const opts = {
        syllables: options.syllables || 3,
        seed: getRandomBytes(16).toString(36),
        phoneticSimplicity: 5,
        compoundSimplicity: 5,
        capFirst: options.capitalize
    };
    
    const wordObj = {
        numeric: getNumericHash(opts.seed),
        lastSkippedPost: false,
        word: '',
        opts: opts
    };
    
    let syllables = opts.syllables;
    while (syllables--) {
        addSyllable(wordObj);
    }
    
    return postProcess(wordObj);
}
</script>
