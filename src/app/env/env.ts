import {Directory} from "app/fs";

export class Env {
    private _cwd: string;
    private _home: string;

    public constructor(path: string | null) {
        this._cwd  = path === null ? "/" : path;
        this._home = "/home/user/";
    }

    public get home(): string {
        return this._home;
    }

    public get cwd(): string {
        return this._cwd;
    }

    public set cwd(value: string) {
        this._cwd = value;
    }

    public absolutePath(path: string): string {
        if (path.startsWith("~")) {
            // FIXME: What about files like "~foo" ?
            path = this.home + path.substr(2);
        }

        let addSlash = false;
        if (path.endsWith("/")) {
            if (path !== "/") {
                path     = path.slice(0, -1);
                addSlash = true;
            }
        }

        if (!path.startsWith("/")) {
            path = this.cwd + path;
        }

        let pathItems = path.split("/");

        if (pathItems[0] === ".") {
            let cwd = this.cwd.split("/");
            if (cwd[0] === "") {
                cwd.shift();
            }

            if (cwd.length !== 0) {
                pathItems = cwd.concat(pathItems.slice(1));
            }
        }

        if (pathItems[0] === "..") {
            pathItems = this.cwd.split("/").slice(0, -1).concat(pathItems.slice(1));
        }

        for (let i = 0; i < pathItems.length; ++i) {
            if (pathItems[i] === "..") {
                pathItems.splice(i - 1, 2);
                i -= 2;
                if (i == pathItems.length - 1) {
                    pathItems.push("");
                }
            } else if (pathItems[i] === ".") {
                pathItems.splice(i, 1);
                --i;
                if (i == pathItems.length - 1) {
                    pathItems.push("");
                }
            }
        }

        if (addSlash) {
            pathItems.push("");
        }

        return pathItems.join("/");
    }

    public getPathDirectory(): Directory {
        const dir = Directory.findFromPath(this.absolutePath(this.cwd));
        if (dir === null) {
            throw new Error("Directory not found");
        }

        return dir;
    }
}
