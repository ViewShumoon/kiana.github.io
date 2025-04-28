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

export interface RandomTimestampIdGenerateOptions {
    prefixString: string,
    
    timestampType: TimestampType

    postfixLength: number;
    includeLowercase: boolean;
    includeUppercase: boolean;
}

enum CharsetType {
    None = 0b00,        // 00
    Lowercase = 0b01,   // 01
    Uppercase = 0b10,   // 10
    Both = 0b11         // 11
}

export enum TimestampType {
    seconds,
    milliseconds
}

export enum LanguageMode {
    english,
    chinese
}
