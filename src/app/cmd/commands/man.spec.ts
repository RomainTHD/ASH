import {Command} from "app/cmd";
import {ExitCode} from "app/process";
import {tests} from "app/utils";

describe("Man", () => {
    it("should return the correct documentation", async () => {
        const cmd = "ls";
        const out = await tests.executeCommand(`man ${cmd}`);
        expect(out.exitCode).toBe(ExitCode.Success);
        expect(out.output).toContain(Command.fromString(cmd).usage);
        expect(out.output).toContain(Command.fromString(cmd).description);
    });
});
