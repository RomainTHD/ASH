import {Command} from "app/cmd/command";
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
export class Clear extends Command {
    public static override readonly command = "clear";

    public override readonly description = "Clear the screen";
    public override readonly usage       = "clear";

    public override async execute(
        args: Arguments,
        env: Env,
        emit: ProcessEmit,
    ): Promise<ExitCode> {
        // FIXME: Ugly implementation
        for (let i = 0; i < 127; ++i) {
            emit();
        }

        return ExitCode.Success;
    }
}
