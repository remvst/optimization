import { LazyPool } from "./../src";

describe("a lazy pool", () => {
    let makeEntry: jasmine.Spy<() => any>;
    let pool: LazyPool<any>;

    beforeEach(() => {
        makeEntry = jasmine.createSpy();
        pool = new LazyPool();
    });

    it("can create a new value", () => {
        const createdValue = {};
        makeEntry.and.returnValue(createdValue);

        const value = pool.getOrCreate("foo", makeEntry);
        expect(value).toBe(createdValue);
        expect(makeEntry).toHaveBeenCalled();
    });

    it("will only create a value once per key", () => {
        const createdValue = {};
        makeEntry.and.returnValue(createdValue);

        const value1 = pool.getOrCreate("foo", makeEntry);
        const value2 = pool.getOrCreate("foo", makeEntry);
        expect(value1).toBe(createdValue);
        expect(value2).toBe(createdValue);

        expect(makeEntry).toHaveBeenCalledTimes(1);
    });

    it("can be reset", () => {
        const createdValue = {};
        makeEntry.and.returnValue(createdValue);

        const value1 = pool.getOrCreate("foo", makeEntry);
        expect(value1).toBe(createdValue);

        pool.reset();
        const createdValueAfter = {};
        makeEntry.and.returnValue(createdValueAfter);

        const value2 = pool.getOrCreate("foo", makeEntry);
        expect(value2).toBe(createdValueAfter);

        expect(makeEntry).toHaveBeenCalledTimes(2);
    });

    it("can be reset with a cleanup", () => {
        const createdValue1 = {};
        const createdValue2 = {};

        pool.getOrCreate("foo", () => createdValue1);
        pool.getOrCreate("bar", () => createdValue2);

        const cleanupItem = jasmine.createSpy();
        pool.reset(cleanupItem);

        expect(cleanupItem).toHaveBeenCalledTimes(2);
        expect(cleanupItem).toHaveBeenCalledWith(createdValue1);
        expect(cleanupItem).toHaveBeenCalledWith(createdValue2);
    });

    it("can check that the same function is provided for the same key", () => {
        pool.checkInconsistencies = true;
        pool.getOrCreate("foo", () => 123);
        expect(() => pool.getOrCreate("foo", () => 124)).toThrow();
    });

    it("will not check that the same function is provided by default", () => {
        pool.getOrCreate("foo", () => 123);
        expect(() => pool.getOrCreate("foo", () => 123)).not.toThrow();
    });

    it("will create a new value if the key is different", () => {
        const createdValue1 = { val1: true };
        const createdValue2 = { val2: true };
        makeEntry.and.returnValues(createdValue1, createdValue2);

        const value1 = pool.getOrCreate("foo", makeEntry);
        const value2 = pool.getOrCreate("bar", makeEntry);
        expect(value1).toBe(createdValue1);
        expect(value2).toBe(createdValue2);

        expect(makeEntry).toHaveBeenCalledTimes(2);
    });
});
