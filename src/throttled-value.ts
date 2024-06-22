export class ThrottledValue<ValueType> {
    private readonly interval: () => number;

    private lastCheck: number | null = null;
    private lastValue: ValueType | null = null;

    private earlyExpireIfCallback: (value: ValueType) => boolean = () => false;
    private keepCachedValueIfCallback: (value: ValueType) => boolean = () =>
        false;

    constructor(
        interval: number | (() => number),
        private readonly currentTime: () => number,
        private readonly compute: () => ValueType,
    ) {
        this.interval =
            typeof interval === "number" ? () => interval : interval;
    }

    earlyExpireIf(predicate: (value: ValueType) => boolean): this {
        this.earlyExpireIfCallback = predicate;
        return this;
    }

    keepCachedValueIf(predicate: (value: ValueType) => boolean): this {
        this.keepCachedValueIfCallback = predicate;
        return this;
    }

    get value(): ValueType {
        const currentTime = this.currentTime();

        // Early expiration: we have a cached value but we know it's no longer valid
        if (
            this.lastCheck !== null &&
            this.earlyExpireIfCallback(this.lastValue)
        ) {
            this.lastCheck = null;
        }

        if (
            this.lastCheck === null ||
            currentTime - this.lastCheck > this.interval()
        ) {
            // Late expiration: we have a cached value that expired, but we know it is still valid
            if (
                this.lastCheck !== null &&
                this.keepCachedValueIfCallback(this.lastValue)
            ) {
                this.lastCheck = currentTime;
                return this.lastValue;
            }

            // Otherwise, recompute the value normally
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
