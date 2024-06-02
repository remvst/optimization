import { lazy } from "../src";

describe("lazy", () => {
    it("will not call the initializer before the value is accessed", () => {
        const factory = jasmine.createSpy().and.returnValue(1234);
        lazy(factory);
        expect(factory).toHaveBeenCalledTimes(0);
    });

    it("will call the initializer when the value is accessed", () => {
        const factory = jasmine.createSpy().and.returnValue(1234);
        const lazyVal = lazy(factory);
        expect(lazyVal.value()).toBe(1234);
        expect(factory).toHaveBeenCalledTimes(1);
    });

    it("will only call the initializer once", () => {
        const factory = jasmine.createSpy().and.returnValue(1234);
        const lazyVal = lazy(factory);
        expect(lazyVal.value()).toBe(1234);
        expect(lazyVal.value()).toBe(1234);
        expect(factory).toHaveBeenCalledTimes(1);
    });

    it("can be reset", () => {
        const factory = jasmine.createSpy().and.returnValues(1234, 5678);
        const lazyVal = lazy(factory);
        expect(lazyVal.get()).toBe(1234);
        lazyVal.reset();

        expect(lazyVal.get()).toBe(5678);
        expect(factory).toHaveBeenCalledTimes(2);
    });

    it("will cleanup when calling reset()", () => {
        const factory = jasmine.createSpy().and.returnValue(1234);
        const cleanup = jasmine.createSpy();
        const lazyVal = lazy(factory, cleanup);
        lazyVal.get();
        lazyVal.reset();
        expect(cleanup).toHaveBeenCalledTimes(1);
    });

    it("will not cleanup when calling reset() if the value was never created", () => {
        const factory = jasmine.createSpy().and.returnValue(1234);
        const cleanup = jasmine.createSpy();
        const lazyVal = lazy(factory, cleanup);
        lazyVal.reset();
        expect(cleanup).toHaveBeenCalledTimes(0);
    });
});
