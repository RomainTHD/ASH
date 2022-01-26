import {Command} from "app/cmd/command";
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
