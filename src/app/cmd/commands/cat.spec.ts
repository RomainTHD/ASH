import {Cat} from "app/cmd";
import {Env} from "app/env";
import {
    Directory,
    File,
} from "app/fs";
import {
    ExitCode,
    Process,
} from "app/process";

describe("Cat", () => {
    const env      = new Env(null);
    const content  = "Hello World";
    const fileName = "test.txt";
    const path     = `/${fileName}`;
    const parent   = Directory.getRoot();
    const args     = Process.processArgs([path]);

    it("should create an instance", () => {
        expect(new Cat()).toBeTruthy();
    });

    it("should read an existing file", async () => {
        const f = File.findFromPath(path);
        if (f) {
            f.delete();
        }

        File.create({
            name: fileName,
            content,
            parent: parent.id,
            owner: "",
        }).save();

        let output = "";
        const emit = (msg: string) => output += msg;
        await expectAsync(new Cat().execute(args, env, emit))
            .toBeResolvedTo(ExitCode.Success);
        expect(output).toBe(content);
    });

    it("should not read a nonexistent file", async () => {
        const f = File.findFromPath(path);
        if (f) {
            f.delete();
        }

        let output = "";
        const emit = (msg: string) => output += msg;
        await expectAsync(new Cat().execute(args, env, emit))
            .toBeResolvedTo(ExitCode.NotFound);
        expect(output).not.toBe(content);
    });

    it("should not read a directory", async () => {
        const f = File.findFromPath(path);
        if (f) {
            f.delete();
        }

        let output = "";
        const emit = (msg: string) => output += msg;
        await expectAsync(new Cat().execute(args, env, emit))
            .toBeResolvedTo(ExitCode.Unsupported);
        expect(output).not.toBe(content);
    });
});
