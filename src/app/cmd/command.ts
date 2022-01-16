import {Env} from "app/env";
import {StorageORM} from "app/orm/storageORM";
import {
    Cat,
    Cd,
    Echo,
    Ls,
    Mkdir,
    Pwd,
    Touch,
} from ".";

export abstract class Command {
    public description = "";
    public usage       = "";

    public static async execute(cmd: string, args: string[], env: Env): Promise<string> {
        let command = (() => {
            switch (cmd) {
                case "cat":
                    return new Cat();

                case "cd":
                    return new Cd();

                case "echo":
                    return new Echo();

                case "ls":
                    return new Ls();

                case "mkdir":
                    return new Mkdir();

                case "pwd":
                    return new Pwd();

                case "touch":
                    return new Touch();

                default:
                    return null;
            }
        })();

        if (!command) {
            switch (cmd) {
                case "__reset":
                    StorageORM.resetAll();
                    break;

                default:
                    return `${cmd}: command not found`;
            }

            return "__internal_command__";
        }

        return command.run(args, env);
    }

    public abstract run(args: string[], env: Env): Promise<string>;
}
