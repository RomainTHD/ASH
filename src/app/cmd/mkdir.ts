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
        let path    = args.others[0];
        let pathArr = path.split("/");
        const name  = pathArr.pop() as string;
        path        = pathArr.join("/");

        const dir = Directory.findFromPath(env.absolutePath(path));
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

        return ExitCode.Success;
    }
}
