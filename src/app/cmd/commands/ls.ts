import {Command} from "app/cmd";
import {Directory} from "app/fs";
import {ExitCode} from "app/process";

/**
 * @see description
 * @see usage
 */
export class Ls extends Command {
    public static override readonly command = "ls";

    public static override readonly description = "List files in the current directory";
    public static override readonly usage       = "ls [options] [path]";

    protected override async onExecution(): Promise<ExitCode> {
        const path = this.env.absolutePath(this.args.others[0] || ".");
        const cwd  = Directory.findFromPath(path);
        if (!cwd) {
            this.stdout.emit(`ls: cannot access '${path}': no such directory`);
            return ExitCode.NotFound;
        }

        let output = "[ ";
        cwd.content.forEach((child, idx) => {
            output += `${child.name}`;
            if (idx !== cwd.content.length - 1) {
                output += ",";
            }

            output += " ";
        });

        output += "]";

        this.stdout.emit(output);
        return ExitCode.Success;
    }
}
