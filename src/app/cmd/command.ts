import {Ls} from ".";

export abstract class Command {
    public description = "";
    public usage       = "";

    public static async execute(cmd: string, args: string[]): Promise<string> {
        switch (cmd) {
            case "ls":
                return new Ls().run(args);

            default:
                return `Unknown command: ${cmd}`;
        }
    }

    public abstract run(args: string[]): Promise<string>;
}
