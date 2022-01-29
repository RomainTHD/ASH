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

    it("should not find any documentation", async () => {
        const cmd = "command_that_does_not_exist";
        const out = await tests.executeCommand(`man ${cmd}`);
        expect(out.exitCode).toBe(ExitCode.NotFound);
        expect(out.output).not.toContain(Command.fromString(cmd).usage);
        expect(out.output).not.toContain(Command.fromString(cmd).description);
    });
});
