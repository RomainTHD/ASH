import {Command} from "app/cmd";
import {Env} from "app/env";
import {
    Arguments,
    ExitCode,
    ProcessEmit,
} from "app/process";

/**
 * No-op command
 * @see description
 * @see usage
 */
export class Noop extends Command {
    public static override readonly command = "";

    public override readonly description = "No-op command";
    public override readonly usage       = "";

    public override async execute(
        args: Arguments,
        env: Env,
        emit: ProcessEmit,
    ): Promise<ExitCode> {
        return ExitCode.Success;
    }
}
