import {ExitCode} from "app/process";
import {tests} from "app/utils";

describe("Echo", () => {
    it("should print the message", async () => {
        const msg = "Hello World";
        const out = await tests.executeCommand(`echo ${msg}`);
        expect(out.exitCode).toBe(ExitCode.Success);
        expect(out.output).toContain(msg);
    });
});
