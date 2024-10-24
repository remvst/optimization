export class LazyPool<ItemType> {
    private readonly items = new Map<string, ItemType>();

    getOrCreate<Type extends ItemType>(name: string, create: () => Type): Type {
        let item = this.items.get(name);
        if (!item) {
            item = create();
            this.items.set(name, item);
        }
        return item as Type;
    }

    reset(cleanupItem?: (item: ItemType) => void) {
        if (cleanupItem) {
            for (const item of this.items.values()) {
                cleanupItem(item);
            }
        }
        this.items.clear();
    }
}
