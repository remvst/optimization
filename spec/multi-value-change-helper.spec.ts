import { MultiValueChangeHelper } from "./../src/multi-value-change-helper";

describe("a multi value change helper", () => {
    let helper: MultiValueChangeHelper<any>;

    beforeEach(() => {
        helper = new MultiValueChangeHelper();
    });

    it("will initially require an update", () => {
        expect(helper.requiresUpdate(1, 2, 3)).toBe(true);
    });

    it("will not require an update if the values are the same", () => {
        expect(helper.requiresUpdate(1, 2, 3)).toBe(true);
        expect(helper.requiresUpdate(1, 2, 3)).toBe(false);
    });

    it("will require an update if the values change", () => {
        expect(helper.requiresUpdate(1, 2, 3)).toBe(true);
        expect(helper.requiresUpdate(1, 2, 3)).toBe(false);
        expect(helper.requiresUpdate(1, 2, 4)).toBe(true);
    });

    it("can be reset", () => {
        expect(helper.requiresUpdate(1, 2, 3)).toBe(true);
        expect(helper.requiresUpdate(1, 2, 3)).toBe(false);
        helper.reset();
        expect(helper.requiresUpdate(1, 2, 3)).toBe(true);
    });
});
