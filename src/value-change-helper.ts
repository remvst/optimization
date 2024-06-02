export class ValueChangeHelper<T> {
    value: T | null = null;

    reset() {
        this.value = null;
    }

    get() {
        return this.value;
    }

    requiresUpdate(newValue: T): boolean {
        if (newValue === this.value) {
            return false;
        }

        this.value = newValue;
        return true;
    }
}
