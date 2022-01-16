import {Command} from "app/cmd/command";
import {Env} from "app/env";

export class Pwd extends Command {
    public override readonly description = "Prints the current working directory";
    public override readonly usage       = "pwd";

    public override async run(args: string[], env: Env): Promise<string> {
        return env.cwd;
    }
}
