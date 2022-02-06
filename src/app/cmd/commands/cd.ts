import {Command} from "app/cmd";
import {
    Inode,
    InodeType,
} from "app/fs";
import {ExitCode} from "app/process";

/**
 * @see description
 * @see usage
 */
export class Cd extends Command {
    public static override readonly command = "cd";

    public static override readonly description = "Change directory";
    public static override readonly usage       = "cd [path]";

    protected override async onExecution(): Promise<ExitCode> {
        const path = this.args.others[0] || "~";
        const dir  = Inode.findFromPath(this.env.absolutePath(path));
        if (dir === null) {
            this.stderr.emit(`cd: '${path}': no such directory`);
            return ExitCode.NotFound;
        }

        if (dir.inodeType !== InodeType.Directory) {
            this.stderr.emit(`cd: '${path}': not a directory`);
            return ExitCode.Unsupported;
        }

        this.env.setCwd(path);
        this.stdout.emit(this.env.getCwd());
        return ExitCode.Success;
    }
}
