import {Command} from "app/cmd/command";
import {Env} from "app/env";
import {
    Directory,
    File,
} from "app/fs";
import {
    ExecutableEmit,
    ExitCode,
} from "app/process";

export class Touch extends Command {
    public override readonly description = "Touch a file";
    public override readonly usage       = "touch <file>";

    public override async execute(args: string[], env: Env, emit: ExecutableEmit): Promise<ExitCode> {
        let path    = args[0];
        let pathArr = path.split("/");
        const name  = pathArr.pop() as string;
        path        = pathArr.join("/");

        const dir = Directory.findFromPath(env.absolutePath(path));
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

        return ExitCode.Success;
    }
}
