import {Command} from "app/cmd/command";
import {Env} from "app/env";
import {File} from "app/fs";


export class Cat extends Command {
    public override readonly description = "Prints the contents of a file";
    public override readonly usage       = "cat <file>";

    public override async run(args: string[], env: Env): Promise<string> {
        const f = File.findFromPath(args[0]);
        if (!f) {
            return "";
        }

        return f.content;
    }
}
