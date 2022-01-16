import {Command} from "app/cmd/command";
import {Env} from "app/env";

export class Echo extends Command {
    public override readonly description = "Echo a message";
    public override readonly usage       = "echo [text]";

    public override async run(args: string[], env: Env): Promise<string> {
        return args.join(" ");
    }
}
