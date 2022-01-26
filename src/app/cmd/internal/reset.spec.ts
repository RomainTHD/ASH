import {Env} from "app/env";
import {Directory} from "app/fs";
import {
    ExitCode,
    Process,
} from "app/process";
import {Reset} from ".";

describe("Reset", () => {
    it("should create an instance", () => {
        expect(new Reset()).toBeTruthy();
    });

    it("should reset the filesystem", async () => {
        const dir = Directory.create({
            name: "test",
            parent: Directory.getRoot().id,
            owner: "root",
            content: [],
        });

        const emit = () => undefined;

        await expectAsync(
            new Reset().execute(Process.processArgs([]), new Env(), emit),
        ).toBeResolvedTo(ExitCode.Success);

        expect(Directory.find(dir.id)).toBe(null);
    });
});
