export class DateOnly {
    private _milliseconds: number;

    public get milliseconds(): number {
        return this._milliseconds;
    }

    public set milliseconds(value : number) {
        this._milliseconds = value;
    }

    constructor()
    constructor(dateString: string);
    constructor(milliseconds: number);
    // constructor(date: Date);
    constructor(input?: string | number) {
        if (input) {

        } else if (typeof input === 'string') {
            const [year, month, day] = input.split('-').map(Number);
            this._milliseconds = new Date(year, month - 1, day, 0, 0, 1, 0).getTime();

        } else if (typeof input === 'number') {
            this._milliseconds = new Date(input).setHours(0, 0, 1, 0);

        }

        this._milliseconds = new Date().setHours(0, 0, 1, 0);
    }

    static now(): DateOnly {
        return new DateOnly();
    }



    toString(): string {
        const date = new Date(this._milliseconds);
        const format = "yyyy-MM-dd";

        const _padStart = (value: number): string => value.toString().padStart(2, '0');
        return format
            .replace(/yyyy/g, _padStart(date.getFullYear()))
            .replace(/MM/g, _padStart(date.getMonth() + 1))
            .replace(/dd/g, _padStart(date.getDate()))
    }
};
