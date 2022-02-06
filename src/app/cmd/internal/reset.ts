import {Command} from "app/cmd";
import {StorageORM} from "app/orm";
import {ExitCode} from "app/process";

/**
 * Internal command to reset the database
 * @see description
 * @see usage
 */
export class Reset extends Command {
    public static override readonly command = "__reset";

    public static override readonly description = "Reset the app and erase all filesystem";
    public static override readonly usage       = "__reset";

    protected override async onExecution(): Promise<ExitCode> {
        StorageORM.resetAll();
        this.stddebug.emit("Filesystem erased");
        return ExitCode.Success;
    }
}
