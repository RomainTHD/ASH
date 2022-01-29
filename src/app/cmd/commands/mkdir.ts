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
export class Mkdir extends Command {
    public static override readonly command = "mkdir";

    public override readonly description = "Create a directory";
    public override readonly usage       = "mkdir <path>";

    public override async execute(
        args: Arguments,
        env: Env,
        emit: ProcessEmit,
    ): Promise<ExitCode> {
        const dirPathArg = args.others[0];
        if (!dirPathArg) {
            emit("mkdir: missing directory path");
            return ExitCode.MissingArgument;
        }

        let pathArr   = dirPathArg.split("/");
        const name    = pathArr.pop() as string;
        const absPath = env.absolutePath(pathArr.join("/"));

        const dir = Directory.findFromPath(absPath);
        if (!dir) {
            emit(`mkdir: cannot create directory '${dirPathArg}': no such directory`);
            return ExitCode.NotFound;
        }

        Directory.create({
            name,
            parent: dir.id,
        });

        emit(`${absPath}/${name}`);
        return ExitCode.Success;
    }
}
