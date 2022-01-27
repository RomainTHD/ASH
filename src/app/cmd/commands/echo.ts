import {Command} from "app/cmd";
import {Env} from "app/env";
import {
    Arguments,
    ExitCode,
    ProcessEmit,
} from "app/process";

/**
 * @see description
 * @see usage
 */
export class Echo extends Command {
    public static override readonly command = "echo";

    public override readonly description = "Echo a message";
    public override readonly usage       = "echo [text]";

    public override async execute(
        args: Arguments,
        env: Env,
        emit: ProcessEmit,
    ): Promise<ExitCode> {
        emit(args.others.join(" "), !args.flags["n"]);
        return ExitCode.Success;
    }
}
