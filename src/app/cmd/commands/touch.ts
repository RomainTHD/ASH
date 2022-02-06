import {Command} from "app/cmd";
import {
    Directory,
    File,
} from "app/fs";
import {ExitCode} from "app/process";

/**
 * @see description
 * @see usage
 */
export class Touch extends Command {
    public static override readonly command = "touch";

    public static override readonly description = "Touch a file";
    public static override readonly usage       = "touch <file>";

    protected override async onExecution(): Promise<ExitCode> {
        const filePathArg = this.args.others[0];
        if (!filePathArg) {
            this.stderr.emit("touch: missing file path");
            return ExitCode.MissingArgument;
        }

        const pathArr = filePathArg.split("/");
        const name    = pathArr.pop() as string;
        const absPath = this.env.absolutePath(pathArr.join("/"));

        const dir = Directory.findFromPath(absPath);
        if (!dir) {
            this.stderr.emit(`touch: cannot touch file '${filePathArg}' : directory not found`);
            return ExitCode.NotFound;
        }

        File.create({
            name,
            parent: dir.id,
        });

        this.stdout.emit(absPath);
        return ExitCode.Success;
    }
}
