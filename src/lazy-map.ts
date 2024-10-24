export class LazyMap<KeyType, ValueType> {
    private readonly map = new Map<KeyType, ValueType>();

    constructor(private readonly createValue: (key: KeyType) => ValueType) {}

    get size(): number {
        return this.map.size;
    }

    get(key: KeyType): ValueType {
        if (!this.map.has(key)) {
            this.map.set(key, this.createValue(key));
        }
        return this.map.get(key);
    }

    reset(cleanupValue?: (item: ValueType) => void) {
        if (cleanupValue) {
            for (const item of this.map.values()) {
                cleanupValue(item);
            }
        }
        this.map.clear();
    }
}
