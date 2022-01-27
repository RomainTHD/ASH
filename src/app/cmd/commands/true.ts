import {Command} from "app/cmd/command";
import {ExitCode} from "app/process";

export class True extends Command {
    public override readonly description = "true";
    public override readonly usage       = "true";

    public override async execute(..._: never): Promise<ExitCode> {
        return ExitCode.Success;
    }
}
