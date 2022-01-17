import {Env} from "app/env";
import {ExitCode} from "app/process";

export type ExecutableEmit = (msg: string) => void;

export interface Executable {
    execute(args: string[], env: Env, emit: ExecutableEmit): Promise<ExitCode>;
}
