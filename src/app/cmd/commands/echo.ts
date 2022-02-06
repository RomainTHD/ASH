import {Command} from "app/cmd";
import {ExitCode} from "app/process";

/**
 * @see description
 * @see usage
 */
export class Echo extends Command {
    public static override readonly command = "echo";

    public static override readonly description = "Echo a message";
    public static override readonly usage       = "echo [text]";

    protected override async onExecution(): Promise<ExitCode> {
        this.stdout.emit(this.args.others.join(" "), !this.args.flags["n"]);
        return ExitCode.Success;
    }
}
