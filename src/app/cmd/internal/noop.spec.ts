import {Noop} from "./noop";

describe("No-op", () => {
    it("should create an instance", () => {
        expect(new Noop()).toBeTruthy();
    });
});
