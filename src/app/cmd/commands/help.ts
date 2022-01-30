import {
    Command,
    Man,
    regularCommands,
} from "app/cmd";
import {Env} from "app/env";
import {
    Arguments,
    ExitCode,
    ProcessEmit,
} from "app/process";

/**
 * Show help for a command
 * @see description
 * @see usage
 */
export class Help extends Command {
    public static override readonly command = "help";

    public override readonly description = "Show help for a command";
    public override readonly usage       = "help [command]";

    public override async execute(
        args: Arguments,
        env: Env,
        emit: ProcessEmit,
    ): Promise<ExitCode> {
        if (!args.others[0]) {
            const assoc: Record<string, typeof Command> = regularCommands;
            Object.keys(assoc).forEach((key) => {
                const cmd = Command.fromString(assoc[key].command as string);
                emit(`${cmd.usage} - ${cmd.description}`);
            });

            return ExitCode.Success;
        } else {
            // Not sure about this one, but should work for now
            return new Man().execute(args, env, emit);
        }
    }
}
