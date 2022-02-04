import {ExitCode} from "app/process";
import {utils} from "app/utils";

describe("NotFound", () => {
    it("should not find the command", async () => {
        // NOTE: The command name can NOT be `NotFound.command`, since the
        //  `setCommandName` function will only be called in the `Command`
        //  class. Without this call, the `_cmd` property content is undefined
        //  behaviour, either `undefined` or the previous call value.
        const cmd = "command_that_will_not_be_found";
        const out = await utils.tests.executeCommand(cmd);
        expect(out.exitCode).toBe(ExitCode.Failure);
        expect(out.output).toContain(cmd);
    });
});
