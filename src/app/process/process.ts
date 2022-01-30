import {Env} from "app/env";
import {ExitCode} from "app/process";

export type ProcessEmit = (msg?: string, newLine?: boolean) => void;

export interface Parameter {
    name: string,
    next: string | null,
}

export interface Arguments {
    raw: string[],
    flags: Record<string, Parameter | undefined>,
    options: Record<string, Parameter | undefined>,
    others: string[],
}

export abstract class Process {
    public static processArgs(args: string[]): Arguments {
        let flags: Arguments["flags"]     = {};
        let options: Arguments["options"] = {};
        let others: Arguments["others"]   = [];

        for (let i = 0; i < args.length; ++i) {
            let arg = args[i].trim();
            if (arg.startsWith("--")) {
                let name = arg.slice(2).trim();
                if (name === "") {
                    continue;
                }

                options[name] = {
                    name,
                    next: args[i + 1] ? args[i + 1].trim() : null,
                };
            } else if (arg.startsWith("-")) {
                let name = arg.slice(1).trim();
                name.split("").forEach((flag) => {
                    flags[flag] = {
                        name: flag,
                        next: args[i + 1] ? args[i + 1].trim() : null,
                    };
                });
            } else {
                others.push(arg);
            }
        }

        return {
            raw: args,
            flags,
            options,
            others,
        };
    }

    public abstract execute(args: Arguments, env: Env, emit: ProcessEmit): Promise<ExitCode>;
}

export enum ProcessStatus {
    New        = 0,
    InProgress = 1,
    Completed  = 2,
    Cancelled  = 3
}
