import {
    Command,
    NotFound,
} from "app/cmd";
import {Env} from "app/env";
import {AnsiColor} from "app/output";
import {
    Arguments,
    ExitCode,
    ProcessEmit,
} from "app/process";

export class Man extends Command {
    public static override readonly command = "man";

    public override readonly description = "Informations about a command";
    public override readonly usage       = "man <cmd>";

    public override async execute(
        args: Arguments,
        env: Env,
        emit: ProcessEmit,
    ): Promise<ExitCode> {
        const cmd = args.others[0];
        if (!cmd) {
            emit("man: missing command name");
            return ExitCode.MissingArgument;
        }

        const commandObject = Command.fromString(cmd);
        if (!commandObject || commandObject instanceof NotFound) {
            emit(`man: no manual entry for '${cmd}'`);
            return ExitCode.NotFound;
        }

        emit(`${AnsiColor.BOLD}Manual for \`${cmd}\`${AnsiColor.RESET}`);
        emit(`${AnsiColor.UNDERLINE}Usage:${AnsiColor.RESET}`);
        emit(commandObject.usage);
        emit(`${AnsiColor.UNDERLINE}Description:${AnsiColor.RESET}`);
        emit(commandObject.description);

        return ExitCode.Success;
    }
}
