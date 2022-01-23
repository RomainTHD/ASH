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
    public override readonly description = "Touch a file";
    public override readonly usage       = "touch <file>";

    public override async execute(
        args: Arguments,
        env: Env,
        emit: ProcessEmit,
    ): Promise<ExitCode> {
        let pathArr   = args.others[0].split("/");
        const name    = pathArr.pop() as string;
        const absPath = env.absolutePath(pathArr.join("/"));

        const dir = Directory.findFromPath(absPath);
        if (!dir) {
            emit("No such directory");
            return ExitCode.NotFound;
        }

        File.create({
            name,
            parent: dir.id,
            owner: "",
            content: "created",
        });

        emit(absPath);
        return ExitCode.Success;
    }
}
