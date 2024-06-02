import { ValueChangeHelper } from "../src";

describe("value change helper", () => {
    it("will indicate that the value changed when accessed for the first time", () => {
        const helper = new ValueChangeHelper();
        expect(helper.requiresUpdate(1337)).toBe(true);
    });

    it("will indicate that the value has not changed", () => {
        const helper = new ValueChangeHelper();
        expect(helper.requiresUpdate(1337)).toBe(true);
        expect(helper.requiresUpdate(1337)).toBe(false);
    });

    it("will indicate that the value has changed", () => {
        const helper = new ValueChangeHelper();
        expect(helper.requiresUpdate(1337)).toBe(true);
        expect(helper.requiresUpdate(1337)).toBe(false);
        expect(helper.requiresUpdate(420)).toBe(true);
        expect(helper.requiresUpdate(420)).toBe(false);
    });

    it("can be reset", () => {
        const helper = new ValueChangeHelper();
        expect(helper.requiresUpdate(1337)).toBe(true);
        expect(helper.requiresUpdate(1337)).toBe(false);
        helper.reset();
        expect(helper.requiresUpdate(1337)).toBe(true);
        expect(helper.requiresUpdate(1337)).toBe(false);
    });
});
