import {Env} from "app/env";
import {
    ExitCode,
    Signal,
} from "app/process";
import {ProcessState} from "app/process/process-state";

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
    private _state: ProcessState;

    public constructor() {
        this._state = ProcessState.Created;
        this._state = ProcessState.Running;
    }

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

    public getState(): ProcessState {
        return this._state;
    }

    public canContinue(): boolean {
        return this._state === ProcessState.Running;
    }

    public abstract execute(args: Arguments, env: Env, emit: ProcessEmit): Promise<ExitCode>;

    public emitSignal(signal: Signal): void {
        switch (signal) {
            case Signal.SIGINT:
            case Signal.SIGTERM:
            case Signal.SIGQUIT:
                this._state = ProcessState.Zombie;
                break;

            case Signal.SIGKILL:
                break;

            case Signal.SIGUSR1:
                break;

            case Signal.SIGUSR2:
                break;

            default:
                break;
        }
    }
}
