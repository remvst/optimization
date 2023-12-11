import { ReusablePool } from "../src";

type TestObj = {id: number};

describe('reusable pool', () => {

    let nextId: number;
    let factory: jasmine.Spy<() => TestObj>;
    let pool: ReusablePool<TestObj>;

    beforeEach(() => {
        nextId = 0;
        factory = jasmine.createSpy().and.callFake(() => ({id: nextId++}));
        pool = new ReusablePool(factory);
    });

    it('can provide values', () => {
        expect(pool.take()).toBeTruthy();
        expect(factory).toHaveBeenCalledTimes(1);
    });

    it('can provide multiple values', () => {
        const obj1 = pool.take();
        const obj2 = pool.take();

        expect(factory).toHaveBeenCalledTimes(2);
        expect(obj1).not.toBe(obj2);
    });

    it('can recycle a value', () => {
        const obj1 = pool.take();
        pool.give(obj1);

        const obj2 = pool.take();
        expect(obj2).toBe(obj2);
        expect(factory).toHaveBeenCalledTimes(1);
    });

    it('can only give a value back once', () => {
        const obj1 = pool.take();
        pool.give(obj1);
        pool.give(obj1);

        expect(pool.take()).toBe(obj1);
        expect(pool.take()).not.toBe(obj1);
    });

    it('can prepare values', () => {
        pool.prepare(3);

        expect(factory).toHaveBeenCalledTimes(3);

        expect(pool.take().id).toBe(0);
        expect(pool.take().id).toBe(1);
        expect(pool.take().id).toBe(2);
    });

    it('can keep reusing values without dequeuing them', () => {
        pool.prepare(2);

        expect(pool.reuse().id).toBe(0);
        expect(pool.reuse().id).toBe(1);
        expect(pool.reuse().id).toBe(0);
        expect(pool.reuse().id).toBe(1);
    });
});
