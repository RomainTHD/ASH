import {Command} from "app/cmd/command";
import {Env} from "app/env";
import {
    ExecutableEmit,
    ExitCode,
} from "app/process";

export class Echo extends Command {
    public override readonly description = "Echo a message";
    public override readonly usage       = "echo [text]";

    public override async execute(args: string[], env: Env, emit: ExecutableEmit): Promise<ExitCode> {
        emit(args.join(" "));
        return ExitCode.Success;
    }
}
