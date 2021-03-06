import {Env} from "app/env";
import {
    Directory,
    File,
} from "app/fs";
import {StorageORM} from "app/orm";
import {ExitCode} from "app/process";
import * as utils from "app/utils";

describe("Cd", () => {
    let env: Env;
    let child: Directory;
    let child2: Directory;

    beforeAll(() => {
        StorageORM.resetAll();

        child = Directory.create({
            name: "foo",
            parent: Directory.getRoot().id,
        });

        child2 = Directory.create({
            name: "bar",
            parent: child.id,
        });

        child.addChild(child2);
    });

    beforeEach(() => {
        env = new Env();
    });

    it("should move directory", async () => {
        let out = await utils.tests.executeCommand(
            `cd ${child.name}`,
            null,
            env,
        );
        expect(out.stdout).toContain(child.name);
        expect(out.stderr).toBe("");
        expect(out.exitCode).toBe(ExitCode.Success);
        expect(env.getCwd()).toBe(`/${child.name}`);

        out = await utils.tests.executeCommand(
            `cd ${child2.name}`,
            null,
            env,
        );
        expect(out.stdout).toContain(child.name);
        expect(out.stdout).toContain(child2.name);
        expect(out.stderr).toBe("");
        expect(out.exitCode).toBe(ExitCode.Success);
        expect(env.getCwd()).toBe(`/${child.name}/${child2.name}`);

        out = await utils.tests.executeCommand(
            "cd ..",
            null,
            env,
        );
        expect(out.stdout).toContain(child.name);
        expect(out.stderr).toBe("");
        expect(out.exitCode).toBe(ExitCode.Success);
        expect(env.getCwd()).toBe(`/${child.name}`);
    });

    it("should not move directory if not found", async () => {
        const dirNotFound = "unknown_dir";

        const out = await utils.tests.executeCommand(
            `cd ${dirNotFound}`,
            null,
            env,
        );
        expect(out.stdout).toBe("");
        expect(out.stderr).toContain(dirNotFound);
        expect(out.exitCode).toBe(ExitCode.NotFound);
        expect(env.getCwd()).toBe("/");
    });

    it("should not move in a file", async () => {
        const file = File.create({
            name: "foo",
            parent: child.id,
        });

        const out = await utils.tests.executeCommand(
            `cd /${child.name}/${file.name}`,
            null,
            env,
        );
        expect(out.stdout).toBe("");
        expect(out.stderr).toContain(child.name);
        expect(out.stderr).toContain(file.name);
        expect(out.exitCode).toBe(ExitCode.Unsupported);
        expect(env.getCwd()).not.toBe(`/${child.name}/${file.name}`);
    });
});
