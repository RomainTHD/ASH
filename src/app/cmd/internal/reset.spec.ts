import {Directory} from "app/fs";
import {ExitCode} from "app/process";
import {tests} from "app/utils";

describe("Reset", () => {
    it("should reset the filesystem", async () => {
        const dir = Directory.create({
            name: "test",
            parent: Directory.getRoot().id,
        });

        const out = await tests.executeCommand("__reset");
        expect(out.exitCode).toBe(ExitCode.Success);
        expect(Directory.find(dir.id)).toBe(null);
    });
});
