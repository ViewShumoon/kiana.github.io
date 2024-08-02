const englishWordLists = import.meta.glob(['./english/*.json'], { eager: true });
//const chineseWordLists = import.meta.glob(['./chinese/*.json'], { eager: true });

let allWordsMap: Map<string, string[]> = new Map<string, string[]>();


GetWords("english", englishWordLists);

function GetWords(key: string, moduelList : Record<string, unknown>) {
    for (const path in moduelList) {
        const module: any = moduelList[path];
        const data = module.default;

        let dialectWors: string[] = [];
        if (Array.isArray(data)) {
            dialectWors.push(...data);
        } else {
            dialectWors.push(data);
        }

        allWordsMap.set(key, dialectWors);
    }
}

export default allWordsMap;
