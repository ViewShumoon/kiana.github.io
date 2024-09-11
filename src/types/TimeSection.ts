export class TimeSection {
    start: number | null;
    end: number | null;

    public get duration(): number {
        const duration = TimeSection.GetTimeDuration(this.start, this.end);
        return duration;
    }

    constructor(startTime: number | null, endTime: number | null) {
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

        const timeDiff = endTime - startTime;
        const hoursDiff = timeDiff / (1000 * 60 * 60);
        return Math.ceil(hoursDiff * 20) / 20;
    }
}
