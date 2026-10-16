export interface RandomStringGenerateOptions {
    includeLowercase: boolean;
    includeUppercase: boolean;
    includeNumbers: boolean;
    includeSpecialChars: boolean;
    
    excludeChars: string;
    length: number;
    generateCount: number;

    // 精简密码模式：大写字母和特殊字符只在开头各生成 1 个，数字集中在末尾，中间为小写字母
    compactMode: boolean;
}

export interface RandomUserNameGenerateOptions {
    // language: LanguageMode;

    capitalizeFirst: boolean;
    syllableCount: number;
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
