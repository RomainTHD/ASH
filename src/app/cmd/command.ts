import {Process} from "app/process";
import {
    Cat,
    Cd,
    Echo,
    Ls,
    Mkdir,
    NotFound,
    Pwd,
    Reset,
    Touch,
} from ".";

export abstract class Command extends Process {
    public description = "";
    public usage       = "";

    public static fromString(cmd: string): Command {
        return (() => {
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

                case "__reset":
                    return new Reset();

                default:
                    return new NotFound(cmd);
            }
        })();
    }
}
