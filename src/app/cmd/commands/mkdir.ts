import {Command} from "app/cmd";
import {Directory} from "app/fs";
import {ExitCode} from "app/process";

/**
 * @see description
 * @see usage
 */
export class Mkdir extends Command {
    public static override readonly command = "mkdir";

    public static override readonly description = "Create a directory";
    public static override readonly usage       = "mkdir <path>";

    public override async onExecution(): Promise<ExitCode> {
        const dirPathArg = this.args.others[0];
        if (!dirPathArg) {
            this.stdout.emit("mkdir: missing directory path");
            return ExitCode.MissingArgument;
        }

        const pathArr = dirPathArg.split("/");
        const name    = pathArr.pop() as string;
        const absPath = this.env.absolutePath(pathArr.join("/"));

        const dir = Directory.findFromPath(absPath);
        if (!dir) {
            this.stdout.emit(`mkdir: cannot create directory '${dirPathArg}': no such directory`);
            return ExitCode.NotFound;
        }

        Directory.create({
            name,
            parent: dir.id,
        });

        this.stdout.emit(`${absPath}/${name}`);
        return ExitCode.Success;
    }
}
