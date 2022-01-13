import {Env} from "app/env";
import {Ls} from ".";

export abstract class Command {
    public description = "";
    public usage       = "";

    public static async execute(cmd: string, args: string[], env: Env): Promise<string> {
        switch (cmd) {
            case "ls":
                return new Ls().run(args, env);

            default:
                return `Unknown command: ${cmd}`;
        }
    }

    public abstract run(args: string[], env: Env): Promise<string>;
}
