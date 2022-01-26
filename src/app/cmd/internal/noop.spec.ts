import {Env} from "app/env";
import {
    ExitCode,
    Process,
} from "app/process";
import {Noop} from ".";

describe("No-op", () => {
    it("should create an instance", () => {
        expect(new Noop()).toBeTruthy();
    });

    it("should not do anything", async () => {
        let content = "";
        const emit  = (msg: string) => content += msg;

        await expectAsync(
            new Noop().execute(Process.processArgs([]), new Env(), emit),
        ).toBeResolvedTo(ExitCode.Success);

        expect(content).toBe("");
    });
});
