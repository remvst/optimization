import { ThrottledAction } from "../src";

describe("throttled action", () => {
    let throttler: ThrottledAction;
    let currentTime: jasmine.Spy<() => number>;
    let action: jasmine.Spy<(elapsed: number) => void>;

    beforeEach(() => {
        currentTime = jasmine.createSpy("currentTime");
        action = jasmine.createSpy("action");
        throttler = new ThrottledAction(30, currentTime);
    });

    it("will perform the action the first time", () => {
        currentTime.and.returnValue(0);

        throttler.maybePerform(action);
        expect(action).toHaveBeenCalledOnceWith(0);
    });

    it("will not perform the action if not enough time has passed", () => {
        currentTime.and.returnValue(1337);
        throttler.maybePerform(action);

        currentTime.and.returnValue(1337 + throttler.interval - 0.0001);
        throttler.maybePerform(action);

        expect(action).toHaveBeenCalledTimes(1);
    });

    it("will perform the action after a reset", () => {
        currentTime.and.returnValue(1337);
        throttler.maybePerform(action);
        expect(action).toHaveBeenCalledTimes(1);

        throttler.reset();
        throttler.maybePerform(action);
        expect(action).toHaveBeenCalledTimes(2);
    });

    it("will perform the action if enough time has passed", () => {
        currentTime.and.returnValue(1337);
        throttler.maybePerform(action);
        expect(action).toHaveBeenCalledTimes(1);
        expect(action).toHaveBeenCalledWith(0);

        currentTime.and.returnValue(1337 + throttler.interval);
        throttler.maybePerform(action);
        expect(action).toHaveBeenCalledTimes(2);
        expect(action).toHaveBeenCalledWith(throttler.interval);
    });
});
