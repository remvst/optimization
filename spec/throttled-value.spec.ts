import { ThrottledValue } from "../src";

describe('throttled value', () => {
    const INTERVAL = 0.5;

    let time: number;
    let factory: jasmine.Spy<() => number>;
    let value: ThrottledValue<number>;

    beforeEach(() => {
        time = 0;
        factory = jasmine.createSpy();
        value = new ThrottledValue(
            INTERVAL,
            () => time,
            factory,
        );
    });

    it('will compute the value the first time', () => {
        factory.and.returnValue(123);
        expect(value.value).toBe(123);
        expect(factory).toHaveBeenCalledTimes(1);
    });

    it('will not compute the value if the interval has not passed', () => {
        factory.and.returnValue(123);
        expect(value.value).toBe(123);

        time += INTERVAL;
        expect(value.value).toBe(123);

        expect(factory).toHaveBeenCalledTimes(1);
    });

    it('will compute the value if the interval has passed', () => {
        factory.and.returnValue(123);
        expect(value.value).toBe(123);

        factory.and.returnValue(456);
        time += INTERVAL + 0.0001;
        expect(value.value).toBe(456);
        
        expect(factory).toHaveBeenCalledTimes(2);
    });

    it('will compute the value if reset', () => {
        factory.and.returnValue(123);
        expect(value.value).toBe(123);

        value.reset();
        factory.and.returnValue(456);
        expect(value.value).toBe(456);
        
        expect(factory).toHaveBeenCalledTimes(2);
    });
});
