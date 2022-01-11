import {Ls} from ".";

export class Command {
    public description = "";
    public usage       = "";

    public async run(args: string[]): Promise<string> {
        throw new Error("Not implemented");
    }

    public static async execute(cmd: string, args: string[]): Promise<string> {
        switch (cmd) {
            case "ls":
                return new Ls().run(args);

            default:
                return `Unknown command: ${cmd}`;
        }
    }
}
