import {
    ExitCode,
    Process,
} from "app/process";
import * as utils from "app/utils";

describe("Yes", () => {
    it("should print a default value and be interrupted", async () => {
        await utils.tests.executeCommand(
            "yes",
            Process.processArgs([]),
            null,
            100,
        ).then((out) => {
            expect(out.exitCode).toBe(ExitCode.Interrupted);
            // It should probably have printed the message at least twice,
            //  but it's not guaranteed. However, we cannot test for an exact
            //  value, and we shouldn't relie on 0 or 1 times
            expect(out.stdout.length).toBeGreaterThanOrEqual("y\ny\n".length);
            expect(out.stdout).toMatch(/^(y\n)*$/g);
            expect(out.stderr).toBe("");
        });
    });

    it("should print a custom value indefinitely", async () => {
        const msg = "Hello world";
        await utils.tests.executeCommand(
            "yes",
            Process.processArgs([msg]),
            null,
            100,
        ).then((out) => {
            expect(out.exitCode).toBe(ExitCode.Interrupted);
            expect(out.stdout.length).toBeGreaterThanOrEqual(`${msg}\n${msg}\n`.length);
            expect(out.stdout).toMatch(RegExp(`^(${msg}\\n)*$`));
            expect(out.stderr).toBe("");
        });
    });
});
