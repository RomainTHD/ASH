import {Command} from "app/cmd";
import {
    File,
    Inode,
    InodeType,
} from "app/fs";
import {ExitCode} from "app/process";

/**
 * @see description
 * @see usage
 */
export class Cat extends Command {
    public static override readonly command = "cat";

    public static override readonly description = "Prints the contents of a file";
    public static override readonly usage       = "cat <file>";

    protected override async onExecution(): Promise<ExitCode> {
        const filePathArg = this.args.others[0];
        if (!filePathArg) {
            this.stderr.emit("cat: missing file path");
            return ExitCode.MissingArgument;
        }

        const f = Inode.findFromPath(this.env.absolutePath(filePathArg));
        if (!f) {
            this.stderr.emit(`cat: '${filePathArg}': no such file or directory`);
            return ExitCode.NotFound;
        }

        if (f.inodeType !== InodeType.File) {
            this.stderr.emit(`cat: '${filePathArg}': is not a file`);
            return ExitCode.Unsupported;
        }

        this.stdout.emit((f as File).content);
        return ExitCode.Success;
    }
}
