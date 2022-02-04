import {Env} from "app/env";
import {
    Arguments,
    Process,
    Stream,
} from "app/process";
import {utils} from "app/utils";

/**
 * Builder pattern for processes
 * @see Process
 */
export class ProcessBuilder {
    private _args: Arguments | null;
    private _env: Env | null;
    private _stdout: Stream | null;
    private _stderr: Stream | null;
    private _processClass: typeof Process | null;

    public constructor() {
        this._args         = null;
        this._env          = null;
        this._stdout       = null;
        this._stderr       = null;
        this._processClass = null;
    }

    public get processClass(): typeof Process {
        if (this._processClass === null) {
            throw new Error("processClass is not set");
        }
        return this._processClass;
    }

    public setEnv(env: Env): ProcessBuilder {
        this._env = env;
        return this;
    }

    public setArgs(args: Arguments): ProcessBuilder {
        this._args = args;
        return this;
    }

    public setStdout(stdout: Stream): ProcessBuilder {
        this._stdout = stdout;
        return this;
    }

    public setStderr(stderr: Stream): ProcessBuilder {
        this._stderr = stderr;
        return this;
    }

    public setProcessClass(processClass: typeof Process): ProcessBuilder {
        this._processClass = processClass;
        return this;
    }

    public build(): Process {
        if (this._args === null ||
            this._env === null ||
            this._stdout === null ||
            this._stderr === null ||
            this._processClass === null
        ) {
            throw new utils.errors.BuilderPatternError();
        }

        // It will work, because we're only instantiating child classes
        // @ts-ignore
        return new this._processClass(
            this._args,
            this._env,
            this._stdout,
            this._stderr,
        );
    }
}
