import {Command} from "app/cmd/command";
import {ExitCode} from "app/process";
import * as utils from "app/utils";

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
        const cmdInstance = Command.fromString(cmd);
        expect(out.output).toContain(cmdInstance.usage);
        expect(out.output).toContain(cmdInstance.description);
    });
});
