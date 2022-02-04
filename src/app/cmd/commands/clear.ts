import {Command} from "app/cmd/command";
import {ExitCode} from "app/process";

/**
 * @see description
 * @see usage
 */
export class Clear extends Command {
    public static override readonly command = "clear";

    public static override readonly description = "Clear the screen";
    public static override readonly usage       = "clear";

    protected override async onExecution(): Promise<ExitCode> {
        // FIXME: Ugly implementation
        for (let i = 0; i < 127; ++i) {
            this.stdout.emit();
        }

        return ExitCode.Success;
    }
}
