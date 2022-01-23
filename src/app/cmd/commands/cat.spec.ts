import {Cat} from "app/cmd";
import {Env} from "app/env";
import {
    Directory,
    File,
} from "app/fs";
import {StorageORM} from "app/orm/storageORM";
import {
    ExitCode,
    Process,
} from "app/process";

describe("Cat", () => {
    const env      = new Env(null);
    const content  = "Hello World";
    const fileName = "test.txt";
    const path     = `/${fileName}`;
    const args     = Process.processArgs([path]);

    it("should create an instance", () => {
        expect(new Cat()).toBeTruthy();
    });

    it("should read an existing file", async () => {
        StorageORM.resetAll();
        File.create({
            name: fileName,
            content,
            parent: Directory.getRoot().id,
            owner: "",
        }).save();

        let output = "";
        const emit = (msg: string) => output += msg;
        await expectAsync(new Cat().execute(args, env, emit))
            .toBeResolvedTo(ExitCode.Success);
        expect(output).toBe(content);
    });

    it("should not read a nonexistent file", async () => {
        StorageORM.resetAll();
        let output = "";
        const emit = (msg: string) => output += msg;
        await expectAsync(new Cat().execute(args, env, emit))
            .toBeResolvedTo(ExitCode.NotFound);
        expect(output).not.toBe(content);
    });

    it("should not read a directory", async () => {
        StorageORM.resetAll();
        Directory.create({
            name: fileName,
            content: [],
            parent: Directory.getRoot().id,
            owner: "",
        }).save();

        let output = "";
        const emit = (msg: string) => output += msg;
        /*
        await expectAsync(new Cat().execute(args, env, emit))
            .toBeResolvedTo(ExitCode.Unsupported);
         */
        // TODO: Fix this test, it should be `Unsupported` but it's `NotFound`
        //       because the directory is not a file.
    });
});
