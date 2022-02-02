import {Command} from "app/cmd/command";
import {Env} from "app/env";
import {
    Arguments,
    ExitCode,
    ProcessEmit,
} from "app/process";
import {utils} from "app/utils";

/**
 * @see description
 * @see usage
 */
export class Yes extends Command {
    public static override readonly command = "yes";

    public override readonly description = "Output a string repeatedly until killed";
    public override readonly usage       = "yes [string]";

    public override async execute(
        args: Arguments,
        env: Env,
        emit: ProcessEmit,
    ): Promise<ExitCode> {
        const msg = args.others[0] || "y";
        while (this.canContinue()) {
            emit(msg);
            await utils.time.sleep(1);
        }

        return this.canContinue() ? ExitCode.Success : ExitCode.Cancelled;
    }
}
