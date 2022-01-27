import {Process} from "app/process";
import {commands} from ".";

/**
 * Generic command
 */
export abstract class Command extends Process {
    /**
     * Command name, like `cat` or `ls`
     */
    public static readonly command: string | null = null;

    /**
     * Command description
     */
    public abstract description: string;

    /**
     * Command usage
     */
    public abstract usage: string;

    /**
     * String to command map
     * @param cmd Command
     * @returns Command instance
     */
    public static fromString(cmd: string): Command {
        cmd = cmd.trim();

        // To stop TS complaining
        const assoc: Record<string, typeof Command> = commands;
        let classCommand: typeof Command | null     = null;

        Object.entries(assoc).forEach(([_, currentClass]) => {
            // For each command child class, if its command name is the same
            //  as the command string, then we found the command
            if (cmd === currentClass.command) {
                classCommand = currentClass;
            }
        });

        if (classCommand !== null) {
            // @ts-ignore
            // Weird TS error, the variable type is marked as `never`, which is
            //  clearly wrong, and then the `new` doesn't work since `Command`
            //  is abstract
            return new classCommand();
        } else {
            return new commands.NotFound(cmd);
        }
    }
}
