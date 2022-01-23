import {Env} from "app/env";

describe("Env", () => {
    it("should create an instance", () => {
        expect(new Env(null)).toBeTruthy();
    });

    it("should return the right absolute path", () => {
        const home   = Env["DEFAULT_HOME"];
        const parent = "/a/b/";
        const cwd    = `${parent}c/`;
        const env    = new Env(cwd);

        // Root
        expect(env.absolutePath("/")).toBe("/");
        // Directory
        expect(env.absolutePath("/foo/")).toBe("/foo/");
        // File
        expect(env.absolutePath("/foo/bar")).toBe("/foo/bar");
        expect(env.absolutePath("/foo/bar.txt")).toBe(`/foo/bar.txt`);

        // Inner dot
        expect(env.absolutePath("/foo/./bar/")).toBe("/foo/bar/");
        expect(env.absolutePath("/foo/bar/.")).toBe("/foo/bar/");
        // Inner double dot
        expect(env.absolutePath("/foo/bar1/../bar2/")).toBe("/foo/bar2/");
        expect(env.absolutePath("/foo/bar/..")).toBe("/foo/");

        // Relative dot
        expect(env.absolutePath(".")).toBe(cwd);
        expect(env.absolutePath("./foo")).toBe(`${cwd}foo`);

        // Relative double dot
        expect(env.absolutePath("..")).toBe(parent);
        expect(env.absolutePath("../foo")).toBe(`${parent}foo`);

        // Home
        expect(env.absolutePath("~")).toBe(`${home}`);
        expect(env.absolutePath("~/foo")).toBe(`${home}foo`);

        // Spaces
        expect(env.absolutePath("/foo bar/baz/")).toBe("/foo bar/baz/");

        // Escaped slash
        expect(env.absolutePath("/foo\\/bar/baz/")).toBe("/foo\\/bar/baz/");

        // Dot file
        expect(env.absolutePath("/foo/.bar/baz/")).toBe("/foo/.bar/baz/");
        expect(env.absolutePath("/foo/..bar/baz/")).toBe("/foo/..bar/baz/");
        expect(env.absolutePath(".foo")).toBe(`${cwd}.foo`);
        expect(env.absolutePath("/foo/.bar")).toBe("/foo/.bar");
        expect(env.absolutePath("/foo/..bar")).toBe("/foo/..bar");
    });
});
