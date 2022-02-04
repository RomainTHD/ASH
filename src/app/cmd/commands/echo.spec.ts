import {ExitCode} from "app/process";
import {utils} from "app/utils";

describe("Echo", () => {
    it("should print the message", async () => {
        const msg = "Hello World";

        let out = await utils.tests.executeCommand(`echo ${msg}`);
        expect(out.exitCode).toBe(ExitCode.Success);
        expect(out.output).toBe(`${msg}\n`);

        out = await utils.tests.executeCommand(`echo -n ${msg}`);
        expect(out.exitCode).toBe(ExitCode.Success);
        expect(out.output).toBe(msg);

        out = await utils.tests.executeCommand("echo");
        expect(out.exitCode).toBe(ExitCode.Success);
        expect(out.output).toBe("\n");
    });
});
