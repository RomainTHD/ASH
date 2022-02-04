import {Command} from "app/cmd";
import {ExitCode} from "app/process";
import {utils} from "app/utils";
import {Help} from ".";

describe("Help", () => {
    it("should show the same help as man", async () => {
        const cmd     = "ls";
        const outHelp = await utils.tests.executeCommand(`help ${cmd}`);
        expect(outHelp.exitCode).toBe(ExitCode.Success);
        const outMan = await utils.tests.executeCommand(`man ${cmd}`);
        expect(outHelp.output).toBe(outMan.output);
    });

    it("should list all commands", async () => {
        const cmd = "ls";
        const out = await utils.tests.executeCommand(`help ${cmd}`);
        expect(out.exitCode).toBe(ExitCode.Success);
        const processClass = Command.fromString(cmd).processClass as typeof Command;
        expect(out.output).toContain(processClass.usage as string);
        expect(out.output).toContain(processClass.description as string);
    });
});
