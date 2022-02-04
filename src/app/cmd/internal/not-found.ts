import {Command} from "app/cmd";
import {Env} from "app/env";
import {
    Arguments,
    ExitCode,
    Stream,
} from "app/process";

/**
 * Internal command to handle not found commands
 * @see description
 * @see usage
 */
export class NotFound extends Command {
    public static override readonly command = "__unknown";

    public static override readonly description = "Command not found";
    public static override readonly usage       = "__unknown";

    private readonly _cmd: string;

    public constructor(
        args: Arguments,
        env: Env,
        stdout: Stream,
        stderr: Stream,
        cmd = "__unknown",
    ) {
        super(args, env, stdout, stderr);
        this._cmd = cmd;
    }

    protected override async onExecution(): Promise<ExitCode> {
        this.stdout.emit(`${this._cmd}: command not found`);
        return ExitCode.Failure;
    }
}
