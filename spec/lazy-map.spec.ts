import { LazyMap } from "../src";

describe("a lazy map", () => {
    let factory: jasmine.Spy<(n: number) => string>;
    let map: LazyMap<number, string>;

    beforeEach(() => {
        factory = jasmine.createSpy().and.callFake((n) => n.toString());
        map = new LazyMap<number, string>(factory);
    });

    it("can create a new value", () => {
        expect(map.get(1)).toBe("1");
        expect(factory).toHaveBeenCalledTimes(1);
        expect(map.size).toBe(1);
    });

    it("only creates a value when needed", () => {
        expect(map.get(1)).toBe("1");
        expect(map.get(1)).toBe("1");
        expect(factory).toHaveBeenCalledTimes(1);
        expect(map.size).toBe(1);
    });

    it("creates a value for each key", () => {
        expect(map.get(1)).toBe("1");
        expect(map.get(2)).toBe("2");
        expect(factory).toHaveBeenCalledTimes(2);
        expect(map.size).toBe(2);
    });

    it("can be reset", () => {
        map.get(1);
        map.get(2);

        const cleanupValue = jasmine.createSpy();
        map.reset(cleanupValue);

        expect(map.size).toBe(0);
        expect(cleanupValue).toHaveBeenCalledTimes(2);
        expect(cleanupValue).toHaveBeenCalledWith("1");
        expect(cleanupValue).toHaveBeenCalledWith("2");
    });

    it("can be reset without a cleanup function", () => {
        map.get(1);
        map.get(2);

        map.reset();

        expect(map.size).toBe(0);
    });
});
