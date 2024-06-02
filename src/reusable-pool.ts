import { objectId } from "./object-id";

export interface ReusablePoolBindable {
    pool: ReusablePool<any>;
}

export class ReusablePool<ObjectType extends any> {
    readonly objects: ObjectType[] = [];
    private readonly itemIds = new Set<number>();

    constructor(
        private readonly prepareObject: (
            pool: ReusablePool<ObjectType>,
        ) => ObjectType,
    ) {}

    private prepareSingleObject(): ObjectType {
        const object = this.prepareObject(this);
        (object as ReusablePoolBindable).pool = this;
        return object;
    }

    prepare(count: number): this {
        for (let i = 0; i < count; i++) {
            this.objects.push(this.prepareSingleObject());
        }
        return this;
    }

    // Takes an object from the pool but leaves it there, so it may be reused without giving it back.
    reuse(): ObjectType {
        const object = this.take();
        this.give(object);
        return object;
    }

    // Takes an object from the pool but doesn't give it back. The object should be given back once
    // it's done so it can be reused.
    take(): ObjectType {
        if (!this.objects.length) {
            return this.prepareSingleObject();
        }

        const object = this.objects.shift();
        this.itemIds.delete(objectId(object));
        return object!;
    }

    // Gives an object back to the pool so that it may be reused.
    give(object: ObjectType) {
        const id = objectId(object);
        if (this.itemIds.has(id)) {
            return;
        }

        this.itemIds.add(id);
        this.objects.push(object);
    }
}
