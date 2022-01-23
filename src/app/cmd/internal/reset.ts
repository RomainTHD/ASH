import {Command} from "app/cmd/command";
import {Env} from "app/env";
import {StorageORM} from "app/orm/storageORM";
import {
    Arguments,
    ExitCode,
    ProcessEmit,
} from "app/process";

/**
 * Internal command to reset the database
 * @see description
 * @see usage
 */
export class Reset extends Command {
    public override readonly description = "Reset the app and erase all filesystem";
    public override readonly usage       = "__reset";

    public override async execute(
        args: Arguments,
        env: Env,
        emit: ProcessEmit,
    ): Promise<ExitCode> {
        StorageORM.resetAll();
        emit("OK");
        return ExitCode.Success;
    }
}
