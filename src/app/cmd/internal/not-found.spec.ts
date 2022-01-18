import {NotFound} from "./not-found";

describe("NotFound", () => {
    it("should create an instance", () => {
        expect(new NotFound("__unknown")).toBeTruthy();
    });
});
