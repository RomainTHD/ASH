import {Command} from "app/cmd/command";
import {Env} from "app/env";
import {
    Directory,
    File,
} from "app/fs";

export class Touch extends Command {
    public override readonly description = "Touch a file";
    public override readonly usage       = "touch <file>";

    public override async run(args: string[], env: Env): Promise<string> {
        let path    = args[0];
        let pathArr = path.split("/");
        const name  = pathArr.pop() as string;
        path        = pathArr.join("/");

        const dir = Directory.findFromPath(path);
        if (!dir) {
            return "No such directory";
        }

        File.create({
            name,
            parent: dir.id,
            owner: "",
            content: "created",
        });

        return "Created";
    }
}
