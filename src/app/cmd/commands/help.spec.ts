import {Command} from "app/cmd";
import {ExitCode} from "app/process";
import * as utils from "app/utils";

describe("Help", () => {
    it("should show the same help as man", async () => {
        const cmd     = "ls";
        const outHelp = await utils.tests.executeCommand(`help ${cmd}`);
        expect(outHelp.exitCode).toBe(ExitCode.Success);
        const outMan = await utils.tests.executeCommand(`man ${cmd}`);
        expect(outHelp.stdout).toBe(outMan.stdout);
        expect(outHelp.stderr).toBe("");
        expect(outMan.stderr).toBe("");
    });

    it("should list all commands", async () => {
        const cmd = "ls";
        const out = await utils.tests.executeCommand(`help ${cmd}`);
        expect(out.exitCode).toBe(ExitCode.Success);
        const processClass = Command.fromString(cmd).processClass as typeof Command;
        expect(out.stdout).toContain(processClass.usage as string);
        expect(out.stdout).toContain(processClass.description as string);
        expect(out.stderr).toBe("");
    });
});
