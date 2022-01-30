import {Command} from "app/cmd";
import {Env} from "app/env";
import {
    Arguments,
    ExitCode,
    ProcessEmit,
} from "app/process";

/**
 * Internal command to handle not found commands
 * @see description
 * @see usage
 */
export class NotFound extends Command {
    public static override readonly command = "__unknown";

    public override readonly description = "Command not found";
    public override readonly usage       = "__unknown";

    private readonly _cmd: string;

    public constructor(cmd = "__unknown") {
        super();
        this._cmd = cmd;
    }

    public override async execute(
        args: Arguments,
        env: Env,
        emit: ProcessEmit,
    ): Promise<ExitCode> {
        emit(`${this._cmd}: command not found`);
        return ExitCode.Failure;
    }
}
