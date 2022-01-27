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
    public static override readonly command = "cat";

    public override readonly description = "Prints the contents of a file";
    public override readonly usage       = "cat <file>";

    public override async execute(
        args: Arguments,
        env: Env,
        emit: ProcessEmit,
    ): Promise<ExitCode> {
        const filePathArg = args.others[0];
        if (!filePathArg) {
            emit("cat: missing file path");
            return ExitCode.MissingArgument;
        }

        const f = File.findFromPath(env.absolutePath(filePathArg));
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
