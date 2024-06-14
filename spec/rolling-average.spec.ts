import { RollingAverage } from "../src";

describe("rolling average", () => {
    it("starts at zero", () => {
        const ra = new RollingAverage(10);

        expect(ra.windowDuration).toBe(0);
        expect(ra.average).toBe(0);
    });

    it("can start being populated", () => {
        const ra = new RollingAverage(10);
        ra.record(1, 30);

        expect(ra.windowDuration).toBe(1);
        expect(ra.average).toBe(3);
    });

    it("can be populated with the same value", () => {
        const ra = new RollingAverage(10);
        for (let i = 0; i <= 10; i++) {
            ra.record(i, 30);
        }

        expect(ra.windowDuration).toBe(9);
        expect(ra.average).toBe(30);
    });

    it("can be populated with fluctuating values", () => {
        const ra = new RollingAverage(10);
        for (let i = 0; i <= 10; i++) {
            ra.record(i, i % 4);
        }

        expect(ra.windowDuration).toBe(9);
        expect(ra.average).toBe(1.5);
    });

    it("will let its average fluctuate slowly", () => {
        const ra = new RollingAverage(10);
        for (let i = 0; i <= 10; i++) {
            ra.record(i, 30);
        }

        expect(ra.average).toBe(30);

        ra.record(11, 0);
        expect(ra.average).toBe(27);

        ra.record(12, 0);
        expect(ra.average).toBe(24);
    });
});
