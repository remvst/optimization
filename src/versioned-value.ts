export class VersionedValue<T> {
    #value: T;
    #version: number = 0;

    constructor(value: T) {
        this.#value = value;
    }

    get version(): number {
        return this.#version;
    }

    get(): T {
        return this.#value;
    }

    update(update: (value: T) => T) {
        this.#value = update(this.#value);
        this.#version++;
    }

    updateInPlace(update: (value: T) => void) {
        this.update((value) => {
            update(value);
            return value;
        });
    }
}
