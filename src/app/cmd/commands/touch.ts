import {Command} from "app/cmd";
import {Env} from "app/env";
import {
    Directory,
    File,
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
export class Touch extends Command {
    public static override readonly command = "touch";

    public override readonly description = "Touch a file";
    public override readonly usage       = "touch <file>";

    public override async execute(
        args: Arguments,
        env: Env,
        emit: ProcessEmit,
    ): Promise<ExitCode> {
        const filePathArg = args.others[0];
        if (!filePathArg) {
            emit("touch: missing file path");
            return ExitCode.MissingArgument;
        }

        let pathArr   = filePathArg.split("/");
        const name    = pathArr.pop() as string;
        const absPath = env.absolutePath(pathArr.join("/"));

        const dir = Directory.findFromPath(absPath);
        if (!dir) {
            emit(`touch: cannot touch file '${filePathArg}' : directory not found`);
            return ExitCode.NotFound;
        }

        File.create({
            name,
            parent: dir.id,
        });

        emit(absPath);
        return ExitCode.Success;
    }
}