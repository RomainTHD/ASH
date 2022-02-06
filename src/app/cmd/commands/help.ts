import {
    Command,
    Man,
    regularCommands,
} from "app/cmd";
import {ExitCode} from "app/process";
import {ProcessBuilder} from "app/process/process-builder";

/**
 * Show help for a command
 * @see description
 * @see usage
 */
export class Help extends Command {
    public static override readonly command = "help";

    public static override readonly description = "Show help for a command";
    public static override readonly usage       = "help [command]";

    protected override async onExecution(): Promise<ExitCode> {
        if (!this.args.others[0]) {
            const assoc: Record<string, typeof Command> = regularCommands;
            Object.keys(assoc).forEach((key) => {
                // Like we did in `Command`, we're doing some kind of reflection
                //  to go through all commands
                const cmd          = Command.fromString(assoc[key].command as string);
                const processClass = cmd.processClass as typeof Command;
                this.stdout.emit(`${processClass.usage} - ${processClass.description}`);
            });

            return ExitCode.Success;
        } else {
            // FIXME: Ugly way to do so, but should work for now
            const process = new ProcessBuilder()
                .setProcessClass(Man)
                .setArgs(this.args)
                .setEnv(this.env)
                .setStdout(this.stdout)
                .setStderr(this.stderr)
                .build();

            return process.execute();
        }
    }
}
