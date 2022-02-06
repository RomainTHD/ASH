import {ExitCode} from "app/process";
import * as utils from "app/utils";

describe("Echo", () => {
    it("should print the message", async () => {
        const msg = "Hello World";

        let out = await utils.tests.executeCommand(`echo ${msg}`);
        expect(out.exitCode).toBe(ExitCode.Success);
        expect(out.stdout).toBe(`${msg}\n`);
        expect(out.stderr).toBe("");

        out = await utils.tests.executeCommand(`echo -n ${msg}`);
        expect(out.exitCode).toBe(ExitCode.Success);
        expect(out.stdout).toBe(msg);
        expect(out.stderr).toBe("");

        out = await utils.tests.executeCommand("echo");
        expect(out.exitCode).toBe(ExitCode.Success);
        expect(out.stdout).toBe("\n");
        expect(out.stderr).toBe("");
    });
});
