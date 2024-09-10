export class TimeSection {
    public startTime: Date;

    public endTime: Date | null;

    public get start(): number | undefined {
        return this.startTime?.getSeconds();
    }

    public get end(): number | undefined {
        return this.endTime?.getSeconds();
    }

    public get duration(): number | undefined  {
        if (this.endTime) {
            const duration = TimeSection.GetTimeDuration(
                this.startTime,
                this.endTime,
            );
            return duration;
            
        } else {
            const duration = TimeSection.GetTimeDuration(
                this.startTime,
                new Date(),
            );

            return duration;
        }
    }

    constructor(startTime: Date | null, endTime: Date | null) {
        this.startTime = startTime || new Date();
        this.endTime = endTime;
    }

    static GetTimeDuration(startTime: Date, endTime: Date): number {
        const timeDiff = endTime.getTime() - startTime.getTime();
        const hoursDiff = timeDiff / (1000 * 60 * 60);
        return Math.ceil(hoursDiff * 20) / 20;
    }
}
