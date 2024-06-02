export class ThrottledValue<ValueType> {
    private readonly interval: () => number;
    private readonly currentTime: () => number;
    private readonly compute: () => ValueType;

    private lastCheck: number | null = null;
    private lastValue: ValueType | null = null;

    constructor(
        interval: number | (() => number),
        currentTime: () => number,
        compute: () => ValueType,
    ) {
        this.interval =
            typeof interval === "number" ? () => interval : interval;
        this.currentTime = currentTime;
        this.compute = compute;
    }

    get value(): ValueType {
        const currentTime = this.currentTime();
        if (
            this.lastCheck === null ||
            currentTime - this.lastCheck > this.interval()
        ) {
            this.lastCheck = currentTime;
            this.lastValue = this.compute();
        }
        return this.lastValue!;
    }

    reset() {
        this.lastCheck = null;
    }
}
