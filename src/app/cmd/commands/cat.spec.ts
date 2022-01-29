import {
    Directory,
    File,
} from "app/fs";
import {StorageORM} from "app/orm";
import {ExitCode} from "app/process";
import {tests} from "app/utils";

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
            owner: "",
        }).save();

        const out = await tests.executeCommand(`cat ${path}`);
        expect(out.exitCode).toBe(ExitCode.Success);
        expect(out.output).toContain(content);
    });

    it("should not read a nonexistent file", async () => {
        StorageORM.resetAll();
        const out = await tests.executeCommand(`cat ${path}`);
        expect(out.exitCode).toBe(ExitCode.NotFound);
        expect(out.output).not.toContain(content);
    });

    it("should not read a directory", async () => {
        StorageORM.resetAll();
        Directory.create({
            name: fileName,
            content: [],
            parent: Directory.getRoot().id,
            owner: "",
        }).save();

        const out = await tests.executeCommand(`cat ${path}`);
        expect(true).toBeTruthy();

        expect(out.exitCode).toBe(ExitCode.Unsupported);
        expect(out.output).not.toContain(content);
    });

    it("should not read anything", async () => {
        const out = await tests.executeCommand("cat");
        expect(out.exitCode).toBe(ExitCode.MissingArgument);
        expect(out.output).not.toBe("");
    });
});
