import {Command} from "app/cmd/command";
import {Env} from "app/env";
import {
    Arguments,
    ExitCode,
    ProcessEmit,
} from "app/process";

export class NotFound extends Command {
    public override readonly description = "Reset the app and erase all filesystem";
    public override readonly usage       = "__reset";

    private readonly _cmd: string;

    public constructor(cmd: string) {
        super();
        this._cmd = cmd;
    }

    public override async execute(
        args: Arguments,
        env: Env,
        emit: ProcessEmit,
    ): Promise<ExitCode> {
        emit(`${this._cmd}: command not found`);
        return ExitCode.Success;
    }
}
