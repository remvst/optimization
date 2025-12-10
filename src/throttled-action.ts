export class ThrottledAction {
    private lastPerformed: number | null = null;

    constructor(
        public interval: number,
        private readonly currentTime: () => number = () => performance.now(),
    ) {}

    maybePerform(perform: (elapsed: number) => void) {
        const currentTime = this.currentTime();

        const elapsed =
            this.lastPerformed === null ? 0 : currentTime - this.lastPerformed;
        if (this.lastPerformed === null || elapsed >= this.interval) {
            this.lastPerformed = currentTime;
            perform(elapsed);
        }
    }

    reset() {
        this.lastPerformed = null;
    }
}
