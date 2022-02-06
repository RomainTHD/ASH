import {Directory} from "app/fs";

/**
 * Environment
 */
export class Env {
    /**
     * Default home, not terminated with a slash
     * @private
     */
    private static readonly DEFAULT_HOME = "/home/user";

    /**
     * Current working directory, not terminated with a slash
     * @private
     */
    private _cwd: string;

    /**
     * Home directory, not terminated with a slash
     * @private
     */
    private readonly _home: string;

    /**
     * Constructor
     * @param path Current working directory
     */
    public constructor(path: string | null = null) {
        this._cwd = "/";
        if (path !== null) {
            this.setCwd(path);
        }

        this._home = Env.DEFAULT_HOME;
    }

    /**
     * Current working directory
     * @param trailingSlash Add a trailing slash or not
     * @returns Current working directory
     */
    public getCwd(trailingSlash = false): string {
        return this._cwd + (trailingSlash && this._cwd !== "/" ? "/" : "");
    }

    /**
     * Set current working directory
     * @param newCwd New current working directory
     */
    public setCwd(newCwd: string): void {
        let path = this.absolutePath(newCwd);
        if (path.startsWith(this.getHome())) {
            path = `~/${path.substr(this.getHome().length)}`;
        }
        if (path.endsWith("/") && path.length > 1) {
            path = path.substr(0, path.length - 1);
        }

        this._cwd = path;
    }

    /**
     * Get home directory
     * @param trailingSlash Add a trailing slash or not
     * @returns Home directory
     */
    public getHome(trailingSlash = false): string {
        return this._home + (trailingSlash && this._home !== "/" ? "/" : "");
    }

    /**
     * @param path Relative path
     * @returns Absolute path
     */
    public absolutePath(path: string): string {
        if (path.startsWith("~")) {
            // FIXME: What about files like "~foo" ?
            path = this.getHome(true) + path.substr(2);
        }

        let addSlash = false;
        if (path.endsWith("/")) {
            // Possibly add a trailing slash if needed. For now, we remove it
            //  though, but we'll add it again later
            if (path !== "/") {
                path     = path.slice(0, -1);
                addSlash = true;
            }
        }

        if (!path.startsWith("/")) {
            // Adds the current working directory prefix in front of the path
            path = this.getCwd(true) + path;
        }

        const pathItems = path.split("/");

        for (let i = 0; i < pathItems.length; ++i) {
            if (pathItems[i] === "..") {
                // Transform "/foo/bar/../baz" into "/foo/baz" by removing the
                //  previous item
                pathItems.splice(i - 1, 2);
                i -= 2;
                if (i == pathItems.length - 1) {
                    pathItems.push("");
                }
            } else if (pathItems[i] === ".") {
                // Transform "/foo/./bar" into "/foo/bar"
                pathItems.splice(i, 1);
                --i;
                if (i == pathItems.length - 1) {
                    pathItems.push("");
                }
            }
        }

        // Add a trailing slash if needed
        if (addSlash) {
            pathItems.push("");
        }

        return pathItems.join("/");
    }

    /**
     * @returns Directory Current working directory
     * @throws {Error} If current working directory doesn't exist.
     * This shouldn't happen, as it shows an inconsistency in the environment.
     */
    public getPathDirectory(): Directory {
        const dir = Directory.findFromPath(this.absolutePath(this.getCwd()));
        if (dir === null) {
            throw new Error("Directory not found");
        }

        return dir;
    }
}
