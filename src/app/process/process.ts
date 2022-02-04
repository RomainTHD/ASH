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

/**
 * Process arguments
 */
export interface Arguments {
    /**
     * Raw arguments
     * @example `ls -l /home` will get back `["-l", "/home"]`
     */
    raw: string[],

    /**
     * Flags, single character and single dash
     * @example `-v`
     * @example `-xcf`, will be expanded to `-x` `-c` `-f`
     */
    flags: Record<string, Parameter | undefined>,

    /**
     * Options, double dash
     * @example `--help`
     */
    options: Record<string, Parameter | undefined>,

    /**
     * Other arguments
     * @example `ls dir` will get back `["dir"]`
     */
    others: string[],
}

/**
 * Process
 */
export abstract class Process {
    /**
     * Process state
     * @private
     */
    private _state: ProcessState;

    public constructor() {
        this._state = ProcessState.Created;
        this._state = ProcessState.Running;
        // FIXME: Needs to be refactored to allow setting the state flag
    }

    /**
     * Process arguments
     * @param args Arguments
     * @return Processed arguments
     */
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

    /**
     * Can continue running or not
     * @returns Can continue or not
     */
    public canContinue(): boolean {
        return this._state === ProcessState.Running;
    }

    /**
     * Execute process
     * @param args Arguments
     * @param env Environment
     * @param emit Emit callback
     * @returns Exit code
     */
    public abstract execute(args: Arguments, env: Env, emit: ProcessEmit): Promise<ExitCode>;

    /**
     * Emit a signal
     * @param signal Signal
     * @example `emitSignal(Signal.SIGINT)`
     */
    public readonly emitSignal = (signal: Signal): void => {
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
    };
}
