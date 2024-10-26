export class MultiValueChangeHelper<T = any> {
    private values: T[] = [];

    reset() {
        this.values.splice(0, this.values.length);
    }

    requiresUpdate(...newValues: T[]): boolean {
        let isNew = false;
        if (this.values.length !== newValues.length) {
            isNew = true;
        } else {
            for (let i = 0; i < this.values.length; i++) {
                if (this.values[i] !== newValues[i]) {
                    isNew = true;
                    break;
                }
            }
        }

        this.values = newValues;

        return isNew;
    }
}
