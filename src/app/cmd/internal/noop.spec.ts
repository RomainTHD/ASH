import {ExitCode} from "app/process";
import {tests} from "app/utils";

describe("No-op", () => {
    it("should not do anything", async () => {
        const out = await tests.executeCommand("");
        expect(out.exitCode).toBe(ExitCode.Success);
        expect(out.output).toBe("");
    });
});
