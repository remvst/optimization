class LazyValue<T> {
    private initialized = false;
    private cachedValue: T | null = null;

    constructor(
        private readonly getValue: () => T,
        private readonly cleanup: (value: T) => void,
    ) {}

    get(): T {
        if (!this.initialized) {
            this.cachedValue = this.getValue();
            this.initialized = true;
        }
        return this.cachedValue!;
    }

    value(): T {
        return this.get();
    }

    reset() {
        if (!this.initialized) return;

        const { cachedValue } = this;

        this.initialized = false;
        this.cachedValue = null;

        this.cleanup(cachedValue);
    }
}

export function lazy<T>(
    getValue: () => T,
    cleanup: (value: T) => void = () => {},
): LazyValue<T> {
    return new LazyValue(getValue, cleanup);
}
