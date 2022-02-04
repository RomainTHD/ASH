import {Command} from "app/cmd";
import {ExitCode} from "app/process";

export class True extends Command {
    public static override readonly command = "true";

    public static override readonly description = "Do nothing successfully";
    public static override readonly usage       = "true";

    protected override async onExecution(): Promise<ExitCode> {
        return ExitCode.Success;
    }
}
