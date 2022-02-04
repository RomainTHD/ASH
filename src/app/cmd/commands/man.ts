import {
    Command,
    NotFound,
} from "app/cmd";
import {AnsiColor} from "app/output";
import {ExitCode} from "app/process";

export class Man extends Command {
    public static override readonly command = "man";

    public static override readonly description = "Informations about a command";
    public static override readonly usage       = "man <cmd>";

    protected override async onExecution(): Promise<ExitCode> {
        const cmd = this.args.others[0];
        if (!cmd) {
            this.stdout.emit("man: missing command name");
            return ExitCode.MissingArgument;
        }

        const commandObject = Command.fromString(cmd);
        const processClass  = commandObject.processClass as typeof Command;

        if (!commandObject || processClass === NotFound) {
            this.stdout.emit(`man: no manual entry for '${cmd}'`);
            return ExitCode.NotFound;
        }

        this.stdout.emit(`${AnsiColor.BOLD}Manual for \`${cmd}\`${AnsiColor.RESET}`);
        this.stdout.emit(`${AnsiColor.UNDERLINE}Usage:${AnsiColor.RESET}`);
        this.stdout.emit(processClass.usage as string);
        this.stdout.emit(`${AnsiColor.UNDERLINE}Description:${AnsiColor.RESET}`);
        this.stdout.emit(processClass.description as string);

        return ExitCode.Success;
    }
}
