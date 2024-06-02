export class OperationQueue {
    private readonly queued: (() => void)[] = [];
    private processing: boolean = false;

    execute(func: () => void) {
        this.queued.unshift(func);
        this.maybeProcess();
    }

    maybeProcess() {
        if (this.processing || !this.queued.length) {
            return;
        }

        this.processing = true;

        const operation = this.queued.shift();
        if (operation) {
            operation();
        }

        this.processing = false;

        this.maybeProcess();
    }
}
