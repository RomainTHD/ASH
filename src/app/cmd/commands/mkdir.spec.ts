import {ExitCode} from "app/process";
import * as utils from "app/utils";

describe("Mkdir", () => {
    it("should not create anything", async () => {
        const out = await utils.tests.executeCommand("mkdir");
        expect(out.exitCode).toBe(ExitCode.MissingArgument);
        expect(out.stderr).not.toBe("");
        expect(out.stdout).toBe("");
    });
});
