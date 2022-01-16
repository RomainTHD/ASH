import {Env} from "app/env";
import {
    Directory,
    File,
} from "app/fs";
import {Cat} from ".";

describe("Cat", () => {
    const env = new Env(null);
    const content = "Hello World";
    const fileName = "test.txt";
    const path = `/${fileName}`;
    const parent = Directory.getRoot();

    it("should create an instance", () => {
        expect(new Cat()).toBeTruthy();
    });

    it("should read an existing file", async () => {
        File.create({
            name: fileName,
            content,
            parent: parent.id,
            owner: "",
        });

        await expectAsync(new Cat().run([path], env)).toBeResolvedTo(content);
    });

    it("should not read a nonexistent file", async () => {
        const f = File.findFromPath(path);
        if (f) {
            f.delete();
        }

        await expectAsync(new Cat().run([path], env)).toBeResolvedTo("No such file");
    });

    it("should not read a directory", async () => {
        const f = File.findFromPath(path);
        if (f) {
            f.delete();
        }

        // TODO: Complete this test
        await expectAsync(new Cat().run([path], env)).toBeResolvedTo("No such file");
    });
});
