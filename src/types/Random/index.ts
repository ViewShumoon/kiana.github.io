export interface RandomStringGenerateOptions {
    includeLowercase: boolean;
    includeUppercase: boolean;
    includeNumbers: boolean;
    includeSpecialChars: boolean;
    
    excludeChars: string;
    length: number;
    generateCount: number;
}

export interface RandomUserNameGenerateOptions {
    language: LanguageMode;

    capitalizeFirst: boolean;
    useFullWords: boolean;
    dashStriped: boolean;

    wordCount: number;
    generateCount: number;
}

export enum LanguageMode {
    english,
    chinese
}
