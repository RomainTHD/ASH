import {Command} from "app/cmd/command";
import {Env} from "app/env";
import {Directory} from "app/fs";

export class Cd extends Command {
    public override readonly description = "Change directory";
    public override readonly usage       = "cd [path]";

    public override async run(args: string[], env: Env): Promise<string> {
        const path = args[0] || "~";
        const dir  = Directory.findFromPath(path, env);
        if (dir === null) {
            return "error";
        } else {
            env.cwd = path;
        }

        return env.cwd;
    }
}
