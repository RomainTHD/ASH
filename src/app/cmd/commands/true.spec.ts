import {ExitCode} from "app/process";
import * as utils from "app/utils";

describe("True", () => {
    it("should return true", async () => {
        const out = await utils.tests.executeCommand("true");
        expect(out.exitCode).toBe(ExitCode.Success);
        expect(out.stdout).toBe("");
        expect(out.stderr).toBe("");
    });
});
