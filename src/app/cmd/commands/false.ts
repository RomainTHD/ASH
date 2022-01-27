import {Command} from "app/cmd/command";
import {ExitCode} from "app/process";

export class False extends Command {
    public override readonly description = "false";
    public override readonly usage       = "false";

    public override async execute(..._: never): Promise<ExitCode> {
        return ExitCode.Failure;
    }
}
