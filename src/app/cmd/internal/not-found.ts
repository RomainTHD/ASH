import {Command} from "app/cmd";
import {ExitCode} from "app/process";

/**
 * Internal command to handle not found commands
 * @see description
 * @see usage
 */
export class NotFound extends Command {
    public static override readonly command = "__unknown";

    public static override readonly description = "Command not found";
    public static override readonly usage       = "__unknown";

    /**
     * Command used to print `...: command not found`.
     * This needs a default value, or we might encounter some undefined at some
     * point. Ugly fix to an ugly problem.
     * @private
     */
    private static _cmd: string = "__unknown";

    /**
     * Hack to get the command name in the instance, while only sending a class
     * to the builder class.
     * FIXME: This is a hack, and should be removed, as this is not thread safe
     * @param cmd Unknown command
     * @returns NotFound class
     */
    public static setCommandName(cmd: string): typeof NotFound {
        this._cmd = cmd;
        return this;
    }

    protected override async onExecution(): Promise<ExitCode> {
        const cmd = (this.constructor as typeof NotFound)._cmd;
        this.stdout.emit(`${cmd}: command not found`);
        return ExitCode.Failure;
    }
}
