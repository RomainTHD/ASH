import {Env} from "app/env";
import {
    ExitCode,
    ProcessState,
    Signal,
} from "app/process";

export interface Stream {
    emit: (msg?: string, newLine?: boolean) => void;
}

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
     * Arguments
     * @protected
     */
    protected readonly args: Arguments;

    /**
     * Environment
     * @protected
     */
    protected readonly env: Env;

    /**
     * Stdout
     * @protected
     */
    protected readonly stdout: Stream;

    /**
     * Stderr
     * @protected
     */
    protected readonly stderr: Stream;

    /**
     * Process state
     * @private
     */
    private _state: ProcessState;

    public constructor(
        args: Arguments,
        env: Env,
        stdout: Stream,
        stderr: Stream,
    ) {
        this._state = ProcessState.Created;
        this.args   = args;
        this.env    = env;
        this.stdout = stdout;
        this.stderr = stderr;
    }

    /**
     * Process arguments
     * @param args Arguments
     * @returns Processed arguments
     */
    public static processArgs(args: string[]): Arguments {
        const flags: Arguments["flags"]     = {};
        const options: Arguments["options"] = {};
        const others: Arguments["others"]   = [];

        for (let i = 0; i < args.length; ++i) {
            const arg = args[i].trim();
            if (arg.startsWith("--")) {
                const name = arg.slice(2).trim();
                if (name === "") {
                    continue;
                }

                options[name] = {
                    name,
                    next: args[i + 1] ? args[i + 1].trim() : null,
                };
            } else if (arg.startsWith("-")) {
                const name = arg.slice(1).trim();
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
     * @returns Exit code
     */
    public readonly execute = async (): Promise<ExitCode> => {
        this._state    = ProcessState.Running;
        const exitCode = await this.onExecution();
        this._state    = ProcessState.Zombie;
        return exitCode;
    };

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

    protected abstract onExecution(): Promise<ExitCode>;
}
