import {Command} from "app/cmd";
import {Env} from "app/env";
import {
    File,
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
export class Cat extends Command {
    public override readonly description = "Prints the contents of a file";
    public override readonly usage       = "cat <file>";

    public override async execute(
        args: Arguments,
        env: Env,
        emit: ProcessEmit,
    ): Promise<ExitCode> {
        const f = File.findFromPath(env.absolutePath(args.others[0]));
        if (!f) {
            emit("No such file");
            return ExitCode.NotFound;
        }

        if (f.inodeType !== InodeType.File) {
            emit("Not a file");
            return ExitCode.Unsupported;
        }

        emit(f.content);
        return ExitCode.Success;
    }
}
