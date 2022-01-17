import {Env} from "app/env";
import {Directory} from "app/fs";
import {
    ExecutableEmit,
    ExitCode,
} from "app/process";
import {Command} from ".";

export class Ls extends Command {
    public override readonly description = "List files in the current directory";
    public override readonly usage       = "ls [options] [path]";

    public override async execute(args: string[], env: Env, emit: ExecutableEmit): Promise<ExitCode> {
        const cwd = Directory.findFromPath(env.absolutePath(args[0] || "."));
        if (!cwd) {
            emit("error");
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
