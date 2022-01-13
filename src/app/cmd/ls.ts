import {Env} from "app/env";
import {Command} from ".";

export class Ls extends Command {
    public override readonly description = "List files in the current directory";
    public override readonly usage       = "ls";

    public override async run(args: string[], env: Env): Promise<string> {
        return "ls working";
    }
}
