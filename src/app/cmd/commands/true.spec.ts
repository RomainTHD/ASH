import {ExitCode} from "app/process";
import {tests} from "app/utils";

describe("True", () => {
    it("should return true", async () => {
        const out = await tests.executeCommand("true");
        expect(out.exitCode).toBe(ExitCode.Success);
        expect(out.output).toBe("");
    });
});
