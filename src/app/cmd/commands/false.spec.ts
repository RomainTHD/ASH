import {ExitCode} from "app/process";
import * as utils from "app/utils";

describe("False", () => {
    it("should return false", async () => {
        const out = await utils.tests.executeCommand("false");
        expect(out.exitCode).toBe(ExitCode.Failure);
        expect(out.output).toBe("");
    });
});
