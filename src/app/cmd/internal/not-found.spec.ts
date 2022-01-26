import {NotFound} from ".";

describe("NotFound", () => {
    it("should create an instance", () => {
        expect(new NotFound("__unknown")).toBeTruthy();
    });
});
