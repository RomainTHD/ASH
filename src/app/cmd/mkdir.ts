import {Command} from "app/cmd/command";
import {Env} from "app/env";
import {Directory} from "app/fs";

export class Mkdir extends Command {
    public override readonly description = "Create a directory";
    public override readonly usage       = "mkdir <path>";

    public override async run(args: string[], env: Env): Promise<string> {
        let path    = args[0];
        let pathArr = path.split("/");
        const name  = pathArr.pop() as string;
        path        = pathArr.join("/");

        const dir = Directory.findFromPath(path, env);
        if (!dir) {
            return "No such directory";
        }

        Directory.create({
            name,
            parent: dir.id,
            owner: "",
            content: [],
        });

        return "Created";
    }
}
