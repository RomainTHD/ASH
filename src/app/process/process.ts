import {Env} from "app/env";
import {
    Executable,
    ExecutableEmit,
} from "app/process/executable";

export class Process {
    private _program: Executable;

    public constructor(program: Executable) {
        this._program = program;
    }

    public async execute(args: string[], env: Env, emit: ExecutableEmit): Promise<ExitCode> {
        return this._program.execute(args, env, emit);
    }
}

export enum ProcessStatus {
    New        = 0,
    InProgress = 1,
    Completed  = 2,
    Cancelled  = 3
}

export enum ExitCode {
    Success      = 0,
    Error        = 1,
    Cancelled    = 2,
    Timeout      = 3,
    Unknown      = 4,
    Unsupported  = 5,
    Unauthorized = 6,
    NotFound     = 7,
    Invalid      = 8,
}
