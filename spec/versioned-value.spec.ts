import { VersionedValue } from "../src";

describe("versioned value", () => {
    it("can expose its value", () => {
        const versionedValue = new VersionedValue(42);
        expect(versionedValue.get()).toBe(42);
    });

    it("will have a stable version", () => {
        const versionedValue = new VersionedValue(42);
        expect(versionedValue.version).toBe(versionedValue.version);
    });

    it("can update its value", () => {
        const versionedValue = new VersionedValue(42);
        const versionBefore = versionedValue.version;
        versionedValue.update((x) => x + 1);
        expect(versionedValue.get()).toBe(43);
        expect(versionedValue.version).not.toBe(versionBefore);
    });

    it("can update a writable value", () => {
        const versionedValue = new VersionedValue([42, 43]);
        const versionBefore = versionedValue.version;
        versionedValue.updateInPlace((x) => x.push(44));
        expect(versionedValue.get()).toEqual([42, 43, 44]);
        expect(versionedValue.version).not.toBe(versionBefore);
    });
});
