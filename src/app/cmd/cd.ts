import {Command} from "app/cmd/command";
import {Env} from "app/env";
import {Directory} from "app/fs";
import {
    Arguments,
    ExitCode,
    ProcessEmit,
} from "app/process";

export class Cd extends Command {
    public override readonly description = "Change directory";
    public override readonly usage       = "cd [path]";

    public override async execute(
        args: Arguments,
        env: Env,
        emit: ProcessEmit,
    ): Promise<ExitCode> {
        const path = args.others[0] || "~";
        const dir  = Directory.findFromPath(env.absolutePath(path));
        if (dir === null) {
            emit("error");
            return ExitCode.NotFound;
        } else {
            env.cwd = path;
        }

        return ExitCode.Success;
    }
}
