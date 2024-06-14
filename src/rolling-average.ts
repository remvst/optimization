type Sample = {
    date: number;
    value: number;
};

export class RollingAverage {
    private readonly samples: Sample[] = [];

    private valueTotal = 0;
    private oldestIndex = 0;

    constructor(readonly sampleCount: number) {
        for (let i = 0; i < sampleCount; i++) {
            this.samples.push({ date: 0, value: 0 });
        }
    }

    record(date: number, value: number) {
        // Remove the oldest sample from the total
        const sample = this.samples[this.oldestIndex];
        this.valueTotal -= sample.value;

        // Add our new sample
        sample.date = date;
        sample.value = value;
        this.valueTotal += value;

        // Roll
        this.oldestIndex = (this.oldestIndex + 1) % this.sampleCount;
    }

    get average() {
        return this.valueTotal / this.sampleCount;
    }

    get windowDuration(): number {
        const { oldestIndex } = this;
        const newestIndex =
            (oldestIndex + this.sampleCount - 1) % this.sampleCount;

        return this.samples[newestIndex].date - this.samples[oldestIndex].date;
    }
}
