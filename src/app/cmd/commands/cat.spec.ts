import {
    Directory,
    File,
} from "app/fs";
import {StorageORM} from "app/orm";
import {ExitCode} from "app/process";
import * as utils from "app/utils";

describe("Cat", () => {
    const content  = "Hello World";
    const fileName = "test.txt";
    const path     = `/${fileName}`;

    it("should read an existing file", async () => {
        StorageORM.resetAll();
        File.create({
            name: fileName,
            content,
            parent: Directory.getRoot().id,
        });

        const out = await utils.tests.executeCommand(`cat ${path}`);
        expect(out.exitCode).toBe(ExitCode.Success);
        expect(out.stdout).toContain(content);
        expect(out.stderr).toBe("");
    });

    it("should not read a nonexistent file", async () => {
        StorageORM.resetAll();
        const out = await utils.tests.executeCommand(`cat ${path}`);
        expect(out.exitCode).toBe(ExitCode.NotFound);
        expect(out.stdout).toBe("");
        expect(out.stderr).toContain(path);
    });

    it("should not read a directory", async () => {
        StorageORM.resetAll();
        Directory.create({
            name: fileName,
            parent: Directory.getRoot().id,
        });

        const out = await utils.tests.executeCommand(`cat ${path}`);
        expect(true).toBeTruthy();

        expect(out.exitCode).toBe(ExitCode.Unsupported);
        expect(out.stdout).toBe("");
        expect(out.stderr).toContain(path);
    });

    it("should not read anything", async () => {
        const out = await utils.tests.executeCommand("cat");
        expect(out.exitCode).toBe(ExitCode.MissingArgument);
        expect(out.stdout).toBe("");
        expect(out.stderr).not.toBe("");
    });
});
