import type { RandomStringGenerateOptions } from "@/types/Random";

export class RandomHelper {

    public static GenerateRandomString(options: RandomStringGenerateOptions): string;
    public static GenerateRandomString(charset: string, size?: number): string;
    public static GenerateRandomString(value0: RandomStringGenerateOptions | string, value1?: null | number) 
    {
        if (RandomHelper.IsRandomStringGenerateOptions(value0))
        {
            let charset = RandomHelper.GetCharset(value0);
    
            const result = RandomHelper.Generate(charset, value0.length);
            return result;
        }
        else if(typeof value0 === 'string' && typeof value1 === 'number')
        {
            let result = '';
            for (let i = 0; i < value1; i++) {
                result += value0[Math.floor(Math.random() * value0.length)];
            }
            return result;
        }
    };
    
    public static GenerateRandomString_Letters(size : number) {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        const result = RandomHelper.GenerateRandomString(charset, size);

        return result;
    }

    protected static IsRandomStringGenerateOptions(obj: any): obj is RandomStringGenerateOptions {
        return obj && typeof obj === 'object';
    }

    protected static GetCharset(options: RandomStringGenerateOptions): string {
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
    };
    
    protected static Generate(charset : string, size : number): string {
        let result = '';
        for (let i = 0; i < 4; i++) {
            result += charset[Math.floor(Math.random() * charset.length)];
        }
    
        return result;
    };
}
