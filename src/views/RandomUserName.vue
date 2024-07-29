<template>
    <n-card title="随机账号名称生成器">
        <n-form :model="form" label-placement="left" label-width="auto" size="large">
            <n-form-item label="生成语言">
                <n-select v-model:value="form.language" :options="languageOptions" />
            </n-form-item>
            <n-form-item label="排除字符">
                <n-input v-model:value="form.excludedChars" placeholder="输入需要排除的字符" />
            </n-form-item>
            <n-form-item label="首字母大写">
                <n-switch v-model:value="form.capitalizeFirst" />
            </n-form-item>
            <n-form-item label="词语个数">
                <n-input-number v-model:value="form.wordCount" :min="1" :max="5" />
            </n-form-item>
            <n-form-item label="使用完整词语">
                <n-switch v-model:value="form.useFullWords" />
            </n-form-item>
            <n-form-item>
                <n-button type="primary" @click="generateNames">生成</n-button>
            </n-form-item>
        </n-form>
        <n-divider />
        <n-table :bordered="false" :single-line="false">
            <thead>
                <tr>
                    <th>序号</th>
                    <th>账号名称</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(name, index) in generatedNames" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ name }}</td>
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
import { ref } from 'vue';

interface FormData {
    language: string;
    excludedChars: string;
    capitalizeFirst: boolean;
    wordCount: number;
    useFullWords: boolean;
}

const form = ref<FormData>({
    language: 'chinese',
    excludedChars: '',
    capitalizeFirst: false,
    wordCount: 2,
    useFullWords: false,
});

const generatedNames = ref<string[]>([]);

const languageOptions = [
    { label: '中文', value: 'chinese' },
    { label: '英文', value: 'english' },
    { label: '俄语', value: 'russian' },
    { label: '法语', value: 'french' },
    { label: '日语', value: 'japanese' },
    { label: '随机', value: 'random' },
];

function generateNames() {
    generatedNames.value = Array.from({ length: 5 }, () =>
        generateAccountName(
            form.value.language,
            form.value.excludedChars,
            form.value.capitalizeFirst,
            form.value.wordCount,
            form.value.useFullWords
        )
    );
}

function generateAccountName(
    language: string,
    excludedChars: string,
    capitalizeFirst: boolean,
    wordCount: number,
    useFullWords: boolean
): string {
    const wordLists: { [key: string]: string[] } = {
        chinese: ['张', '李', '王', '陈', '刘', '徐', '吴', '郑', '孙', '杨'],
        english: ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon'],
        russian: ['Иван', 'Сергей', 'Екатерина', 'Анна', 'Александр', 'Наталья', 'Дмитрий', 'Мария', 'Николай', 'Ольга'],
        french: ['pierre', 'marie', 'jacques', 'julie', 'françois', 'isabelle', 'philippe', 'sophie', 'louis', 'pauline'],
        japanese: ['田中', '鈴木', '山田', '佐藤', '渡辺', '井上', '斎藤', '清水', '伊藤', '山口'],
    };

    let words: string[] = [];
    if (language === 'random') {
        const keys = Object.keys(wordLists);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        words = wordLists[randomKey];
    } else {
        words = wordLists[language];
    }

    let result = '';
    for (let i = 0; i < wordCount; i++) {
        let word = words[Math.floor(Math.random() * words.length)];
        if (!useFullWords) {
            word = word.slice(0, Math.floor(word.length / 2));
        }
        result += word;
    }

    if (capitalizeFirst) {
        result = result.charAt(0).toUpperCase() + result.slice(1);
    }

    result = result.split('').filter(char => !excludedChars.includes(char)).join('');

    return result;
}
</script>
