import {ExitCode} from "app/process";
import {utils} from "app/utils";

describe("Mkdir", () => {
    it("should not create anything", async () => {
        const out = await utils.tests.executeCommand("mkdir");
        expect(out.exitCode).toBe(ExitCode.MissingArgument);
        expect(out.output).not.toBe("");
    });
});
