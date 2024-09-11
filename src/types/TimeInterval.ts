export class TimeInterval {
    content: string | null;

    start: number | null;
    end: number | null;

    // TODO: ref 时有刷新后不执行的 bug
    public get duration(): number {
        return TimeInterval.GetTimeDuration(this.start, this.end);;
    }
    
    constructor(startTime: number | null, endTime: number | null) {
        this.content = "";
        this.start = startTime;
        this.end = endTime;
    }

    static GetTimeDuration(
        startTime: number | null,
        endTime: number | null,
    ): number {
        if (startTime == null || endTime == null) {
            return 0;
        }

        if (startTime != null && endTime == null) {
            endTime = Date.now();
        }

        const timeDiff = Math.abs(endTime - startTime);
        const hoursDiff = timeDiff / (1000 * 60 * 60);
        return Math.ceil(hoursDiff * 20) / 20; // TODO: 存在精度问题
    }
}

export interface DateTimeInterval {
    [key: string]: TimeInterval[];
}