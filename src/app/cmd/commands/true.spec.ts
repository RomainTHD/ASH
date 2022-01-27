import {ExitCode} from "app/process";
import {True} from ".";

describe("True", () => {
    it("should create an instance", () => {
        expect(new True()).toBeTruthy();
    });

    it("should return true", async () => {
        await expectAsync(new True().execute()).toBeResolvedTo(ExitCode.Success);
    });
});
