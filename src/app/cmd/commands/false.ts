import {Command} from "app/cmd";
import {ExitCode} from "app/process";

export class False extends Command {
    public static override readonly command = "false";

    public static override readonly description = "Do nothing and fails";
    public static override readonly usage       = "false";

    protected override async onExecution(): Promise<ExitCode> {
        return ExitCode.Failure;
    }
}
