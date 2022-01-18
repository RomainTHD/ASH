import {Command} from "app/cmd/command";
import {Env} from "app/env";
import {Directory} from "app/fs";
import {
    Arguments,
    ExitCode,
    ProcessEmit,
} from "app/process";

export class Mkdir extends Command {
    public override readonly description = "Create a directory";
    public override readonly usage       = "mkdir <path>";

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

        Directory.create({
            name,
            parent: dir.id,
            owner: "",
            content: [],
        });

        emit(absPath);
        return ExitCode.Success;
    }
}
