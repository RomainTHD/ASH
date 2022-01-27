import {ExitCode} from "app/process";
import {False} from ".";

describe("False", () => {
    it("should create an instance", () => {
        expect(new False()).toBeTruthy();
    });

    it("should return false", async () => {
        await expectAsync(new False().execute()).toBeResolvedTo(ExitCode.Failure);
    });
});
