import {Command} from "app/cmd";
import {Env} from "app/env";
import {
    Inode,
    InodeType,
} from "app/fs";
import {
    Arguments,
    ExitCode,
    ProcessEmit,
} from "app/process";

/**
 * @see description
 * @see usage
 */
export class Cd extends Command {
    public static override readonly command = "cd";

    public override readonly description = "Change directory";
    public override readonly usage       = "cd [path]";

    public override async execute(
        args: Arguments,
        env: Env,
        emit: ProcessEmit,
    ): Promise<ExitCode> {
        const path = args.others[0] || "~";
        const dir  = Inode.findFromPath(env.absolutePath(path));
        if (dir === null) {
            emit(`cd: '${path}': no such directory`);
            return ExitCode.NotFound;
        }

        if (dir.inodeType !== InodeType.Directory) {
            emit(`cd: '${path}': not a directory`);
            return ExitCode.Unsupported;
        }

        env.setCwd(path);
        emit(env.getCwd());
        return ExitCode.Success;
    }
}
