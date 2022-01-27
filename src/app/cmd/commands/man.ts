import {Command} from "app/cmd/command";
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
        const cmd = args.others[0] || null;
        if (cmd === null || cmd === "") {
            emit("man: missing command name");
            return ExitCode.MissingArgument;
        }

        emit(`${AnsiColor.BOLD}Manual for \`${cmd}\`${AnsiColor.RESET}`);
        const commandObject = Command.fromString(cmd);
        emit(`${AnsiColor.UNDERLINE}Usage:${AnsiColor.RESET}`);
        emit(commandObject.usage);
        emit(`${AnsiColor.UNDERLINE}Description:${AnsiColor.RESET}`);
        emit(commandObject.description);

        return ExitCode.Success;
    }
}
