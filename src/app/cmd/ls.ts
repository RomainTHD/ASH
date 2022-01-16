import {Env} from "app/env";
import {Directory} from "app/fs";
import {Command} from ".";

export class Ls extends Command {
    public override readonly description = "List files in the current directory";
    public override readonly usage       = "ls [options] [path]";

    public override async run(args: string[], env: Env): Promise<string> {
        const cwd = Directory.findFromPath(args[0] || ".", env);
        if (!cwd) {
            return "error";
        }

        let output = "[ ";
        cwd.content.forEach((child, idx) => {
            output += `${child.name}`;
            if (idx !== cwd.content.length - 1) {
                output += ",";
            }

            output += " ";
        });

        output += "]";

        return output;
    }
}
