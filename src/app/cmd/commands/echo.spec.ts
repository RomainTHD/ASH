import {ExitCode} from "app/process";
import {tests} from "app/utils";

describe("Echo", () => {
    it("should print the message", async () => {
        const msg = "Hello World";

        let out = await tests.executeCommand(`echo ${msg}`);
        expect(out.exitCode).toBe(ExitCode.Success);
        expect(out.output).toBe(msg);

        out = await tests.executeCommand(`echo -n ${msg}`);
        expect(out.exitCode).toBe(ExitCode.Success);
        expect(out.output).toBe(msg);

        out = await tests.executeCommand("echo");
        expect(out.exitCode).toBe(ExitCode.Success);
        expect(out.output).toBe("");
    });
});
