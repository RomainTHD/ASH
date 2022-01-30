import {ExitCode} from "app/process";
import {tests} from "app/utils";

describe("False", () => {
    it("should return false", async () => {
        const out = await tests.executeCommand("false");
        expect(out.exitCode).toBe(ExitCode.Failure);
        expect(out.output).toBe("");
    });
});
