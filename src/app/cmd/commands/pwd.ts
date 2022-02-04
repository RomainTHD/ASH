import {Command} from "app/cmd";
import {ExitCode} from "app/process";

/**
 * @see description
 * @see usage
 */
export class Pwd extends Command {
    public static override readonly command = "pwd";

    public static override readonly description = "Prints the current working directory";
    public static override readonly usage       = "pwd";

    protected override async onExecution(): Promise<ExitCode> {
        this.stdout.emit(this.env.getCwd());
        return ExitCode.Success;
    }
}
