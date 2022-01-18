import {Command} from "app/cmd";
import {Env} from "app/env";
import {
    Arguments,
    ExitCode,
    ProcessEmit,
} from "app/process";

export class Echo extends Command {
    public override readonly description = "Echo a message";
    public override readonly usage       = "echo [text]";

    public override async execute(
        args: Arguments,
        env: Env,
        emit: ProcessEmit,
    ): Promise<ExitCode> {
        emit(args.others.join(" "));
        return ExitCode.Success;
    }
}
