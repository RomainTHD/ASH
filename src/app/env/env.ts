import {Directory} from "app/fs";

export class Env {
    private _cwd: string;
    private _home: string;

    public constructor(path: string | null) {
        this._cwd  = path === null ? "/" : path;
        this._home = "/home";
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

    public getPathDirectory(): Directory {
        const dir = Directory.findFromPath(this.cwd, this);
        if (dir === null) {
            throw new Error("Directory not found");
        }

        return dir;
    }
}
