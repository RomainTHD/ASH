import {ExitCode} from "app/process";
import {tests} from "app/utils";

describe("Touch", () => {
    it("should not create anything", async () => {
        const out = await tests.executeCommand("touch");
        expect(out.exitCode).toBe(ExitCode.MissingArgument);
        expect(out.output).not.toBe("");
    });
});
