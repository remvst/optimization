class LazyValue<T> {
    private initialized = false;
    private cachedValue: T | null = null;

    constructor(private readonly getValue: () => T) {}

    value(): T {
        if (!this.initialized) {
            this.cachedValue = this.getValue();
            this.initialized = true;
        }
        return this.cachedValue!;
    }
}

export function lazy<T>(getValue: () => T): LazyValue<T> {
    return new LazyValue(getValue);
}
