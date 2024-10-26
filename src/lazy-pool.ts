export class LazyPool<ItemType> {
    private readonly items = new Map<string, ItemType>();
    private readonly functions = new Map<string, string>();

    checkInconsistencies = false;

    getOrCreate<Type extends ItemType>(key: string, create: () => Type): Type {
        let item = this.items.get(key);
        if (!item) {
            item = create();
            this.items.set(key, item);
            if (this.checkInconsistencies) {
                this.functions.set(key, create.toString());
            }
        } else {
            if (
                this.checkInconsistencies &&
                this.functions.get(key) !== create.toString()
            ) {
                throw new Error(`Different function provided for key ${key}`);
            }
        }
        return item as Type;
    }

    reset(cleanupItem?: (item: ItemType) => void) {
        if (cleanupItem) {
            for (const item of this.items.values()) {
                cleanupItem(item);
            }
        }
        this.functions.clear();
        this.items.clear();
    }
}
