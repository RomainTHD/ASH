import {Env} from "app/env";
import {Directory} from "app/fs";
import {Command} from ".";

export class Ls extends Command {
    public override readonly description = "List files in the current directory";
    public override readonly usage       = "ls";

    public override async run(args: string[], env: Env): Promise<string> {
        const cwd = Directory.findFromPath(env.path);
        if (!cwd) {
            return "error";
        }

        let output = "";
        for (const child of cwd.content) {
            output += `${child.name}\n`;
        }

        return output;
    }
}
