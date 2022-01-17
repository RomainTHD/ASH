import {Command} from "app/cmd/command";
import {Env} from "app/env";
import {
    ExecutableEmit,
    ExitCode,
} from "app/process";

export class Pwd extends Command {
    public override readonly description = "Prints the current working directory";
    public override readonly usage       = "pwd";

    public override async execute(args: string[], env: Env, emit: ExecutableEmit): Promise<ExitCode> {
        emit(env.cwd);
        return ExitCode.Success;
    }
}
