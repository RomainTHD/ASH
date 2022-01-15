import {Env} from "app/env/env";

describe("Env", () => {
    it("should create an instance", () => {
        expect(new Env(null)).toBeTruthy();
    });
});
