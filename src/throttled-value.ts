export class ThrottledValue<ValueType> {
    private readonly interval: () => number;

    private lastCheck: number | null = null;
    private lastValue: ValueType | null = null;

    constructor(
        interval: number | (() => number),
        private readonly currentTime: () => number,
        private readonly compute: () => ValueType,
    ) {
        this.interval =
            typeof interval === "number" ? () => interval : interval;
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

    get(): ValueType {
        return this.value;
    }

    reset() {
        this.lastCheck = null;
    }
}
