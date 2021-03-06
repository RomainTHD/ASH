import {Command} from "app/cmd";
import {ExitCode} from "app/process";
import * as utils from "app/utils";

describe("Man", () => {
    it("should return the correct documentation", async () => {
        const cmd = "ls";
        const out = await utils.tests.executeCommand(`man ${cmd}`);
        expect(out.exitCode).toBe(ExitCode.Success);
        const processClass = Command.fromString(cmd).processClass as typeof Command;
        expect(out.stdout).toContain(processClass.usage as string);
        expect(out.stdout).toContain(processClass.description as string);
        expect(out.stderr).toBe("");
    });

    it("should not find any documentation", async () => {
        const cmd = "command_that_does_not_exist";
        const out = await utils.tests.executeCommand(`man ${cmd}`);
        expect(out.exitCode).toBe(ExitCode.NotFound);
        const processClass = Command.fromString(cmd).processClass as typeof Command;
        expect(out.stdout).not.toContain(processClass.usage as string);
        expect(out.stdout).not.toContain(processClass.description as string);
        expect(out.stderr).toContain(cmd);
    });
});
