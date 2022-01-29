import {Command} from "app/cmd";
import {Env} from "app/env";
import {Directory} from "app/fs";
import {
    Arguments,
    ExitCode,
    ProcessEmit,
} from "app/process";

/**
 * @see description
 * @see usage
 */
export class Ls extends Command {
    public static override readonly command = "ls";

    public override readonly description = "List files in the current directory";
    public override readonly usage       = "ls [options] [path]";

    public override async execute(
        args: Arguments,
        env: Env,
        emit: ProcessEmit,
    ): Promise<ExitCode> {
        const path = env.absolutePath(args.others[0] || ".");
        const cwd  = Directory.findFromPath(path);
        if (!cwd) {
            emit("ls: no such directory");
            return ExitCode.NotFound;
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

        emit(output);
        return ExitCode.Success;
    }
}
