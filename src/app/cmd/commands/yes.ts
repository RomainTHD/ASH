import {Command} from "app/cmd/command";
import {ExitCode} from "app/process";
import * as utils from "app/utils";

/**
 * @see description
 * @see usage
 */
export class Yes extends Command {
    public static override readonly command = "yes";

    public static override readonly description = "Output a string repeatedly until killed";
    public static override readonly usage       = "yes [string]";

    protected override async onExecution(): Promise<ExitCode> {
        const msg = this.args.others[0] || "y";
        while (this.canContinue()) {
            this.stdout.emit(msg);
            await utils.time.sleep(1);
        }

        return this.canContinue() ? ExitCode.Success : ExitCode.Interrupted;
    }
}
