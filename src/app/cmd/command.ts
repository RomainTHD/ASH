import {Env} from "app/env";
import {StorageORM} from "app/orm/storageORM";
import {ExitCode} from "app/process";
import {
    Executable,
    ExecutableEmit,
} from "app/process/executable";
import {
    Cat,
    Cd,
    Echo,
    Ls,
    Mkdir,
    Pwd,
    Touch,
} from ".";

export abstract class Command implements Executable {
    public description = "";
    public usage       = "";

    public static fromString(cmd: string): Executable {
        let command: Executable | null = (() => {
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
            command = ((): Executable => {
                switch (cmd) {
                    case "__reset":
                        return {
                            execute: async () => {
                                StorageORM.resetAll();
                                return 0;
                            },
                        };

                    default:
                        return {
                            execute: async (args, env, emit) => {
                                emit(`${cmd}: command not found`);
                                return 1;
                            },
                        };
                }
            })();
        }

        return command;
    }

    public abstract execute(args: string[], env: Env, emit: ExecutableEmit): Promise<ExitCode>;
}
