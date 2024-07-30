

const allWordLists = import.meta.glob(['./*.json', '!./index.ts'], { eager: true });

// ["english", "american", "australian", "british", "canadian"].forEach(
//     function(dialect) {

//     }
// );

var wordlist: Map<string, string[]> = new Map<string, string[]>();

for (const path in allWordLists) {
    const module: any = allWordLists[path];
    const data = module.default;
    //console.log(path, data)

    const dialectKey = path.substring(2, path.indexOf("-"));

    let words: string[] = [];
    if (Array.isArray(data)) {
        words.push(...data);
    } else {
        words.push(data);
    }
    
    let dialectWors = wordlist.get(dialectKey);
    if (dialectWors) {
        dialectWors.push(...words);
        wordlist.set(dialectKey, dialectWors);
    } else {
        wordlist.set(dialectKey, words);
    }
}



export default wordlist;
