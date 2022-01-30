import {Command} from "app/cmd";
import {ExitCode} from "app/process";

export class False extends Command {
    public static override readonly command = "false";

    public override readonly description = "Do nothing and fails";
    public override readonly usage       = "false";

    public override async execute(..._: never): Promise<ExitCode> {
        return ExitCode.Failure;
    }
}
