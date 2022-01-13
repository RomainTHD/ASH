export class Env {
    private _path: string;

    public constructor(path: string | null) {
        this._path = path === null ? "/" : path;
    }

    public get path(): string {
        return this._path;
    }

    public set path(value: string) {
        this._path = value;
    }
}
