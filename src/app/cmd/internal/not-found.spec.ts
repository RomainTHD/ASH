import {ExitCode} from "app/process";
import {tests} from "app/utils";

describe("NotFound", () => {
    it("should create an instance", async () => {
        const cmd = "__unknown";
        const out = await tests.executeCommand(cmd);
        expect(out.exitCode).toBe(ExitCode.Failure);
        expect(out.output).toContain(cmd);
    });
});
