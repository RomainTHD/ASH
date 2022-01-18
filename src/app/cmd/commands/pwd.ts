import {Command} from "app/cmd";
import {Env} from "app/env";
import {
    Arguments,
    ExitCode,
    ProcessEmit,
} from "app/process";

export class Pwd extends Command {
    public override readonly description = "Prints the current working directory";
    public override readonly usage       = "pwd";

    public override async execute(
        args: Arguments,
        env: Env,
        emit: ProcessEmit,
    ): Promise<ExitCode> {
        emit(env.cwd);
        return ExitCode.Success;
    }
}
