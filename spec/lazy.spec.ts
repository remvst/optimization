import { lazy } from "../src";

describe('lazy', () => {
    it('will not call the initializer before the value is accessed', () => {
        const factory = jasmine.createSpy().and.returnValue(1234);
        lazy(factory);
        expect(factory).toHaveBeenCalledTimes(0);
    });

    it('will call the initializer when the value is accessed', () => {
        const factory = jasmine.createSpy().and.returnValue(1234);
        const lazyVal = lazy(factory);
        expect(lazyVal.value()).toBe(1234);
        expect(factory).toHaveBeenCalledTimes(1);
    });

    it('will only call the initializer once', () => {
        const factory = jasmine.createSpy().and.returnValue(1234);
        const lazyVal = lazy(factory);
        expect(lazyVal.value()).toBe(1234);
        expect(lazyVal.value()).toBe(1234);
        expect(factory).toHaveBeenCalledTimes(1);
    });
});
