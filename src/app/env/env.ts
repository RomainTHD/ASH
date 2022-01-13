export class Env {
    private _path: string;

    public constructor(path: string | null) {
        this._path = path === null ? "/" : path;
    }
}
