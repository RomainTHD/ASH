import {Process} from "app/process";
import {ProcessBuilder} from "app/process/process-builder";
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
    public static description: string | null = null;

    /**
     * Command usage
     */
    public static usage: string | null = null;

    /**
     * String to command map
     * @param cmd Command
     * @returns Command instance
     */
    public static fromString(cmd: string): ProcessBuilder {
        cmd = cmd.trim();

        // To stop TS complaining
        const assoc: Record<string, typeof Command> = commands;
        let classCommand: typeof Command | null     = null;

        Object.entries(assoc).forEach(([_, currentClass]) => {
            void _;
            // For each command child class, if its command name is the same
            //  as the command string, then we found the command
            if (cmd === currentClass.command) {
                classCommand = currentClass;
            }
        });

        const builder = new ProcessBuilder();
        if (classCommand !== null) {
            builder.setProcessClass(classCommand);
        } else {
            builder.setProcessClass(commands.NotFound.setCommandName(cmd));
        }

        return builder;
    }
}
