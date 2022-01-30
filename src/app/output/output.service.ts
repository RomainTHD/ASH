import {Injectable} from "@angular/core";
import {Env} from "app/env";
import {
    Subject,
    Subscription,
} from "rxjs";

export interface CommandEntry {
    command: string;
    env: Env;
    time: Date;
}

export interface OutputEntry {
    output: string,
}

@Injectable({
    providedIn: "root",
})
export class OutputService {
    private onPromptMessage: Subject<string>;
    private onNewCommand: Subject<CommandEntry>;
    private onNewOutput: Subject<string>;
    private onCommandEnd: Subject<undefined>;

    constructor() {
        this.onPromptMessage = new Subject<string>();
        this.onNewCommand    = new Subject<CommandEntry>();
        this.onNewOutput     = new Subject<string>();
        this.onCommandEnd    = new Subject<undefined>();
    }

    public subscribePromptMessage(callback: (msb: string) => void): Subscription {
        return this.onPromptMessage.subscribe(callback);
    }

    public emitPromptMessage(promptMessage: string): void {
        this.onPromptMessage.next(promptMessage);
    }

    public subscribeNewCommand(callback: (obj: CommandEntry) => void): Subscription {
        return this.onNewCommand.subscribe(callback);
    }

    public emitNewCommand(command: string, env: Env): void {
        this.onNewCommand.next({
            command,
            env,
            time: new Date(),
        });
    }

    public subscribeOutput(callback: (output: string) => void): Subscription {
        return this.onNewOutput.subscribe(callback);
    }

    public emitOutput(output: string): void {
        this.onNewOutput.next(output);
    }

    public subscribeCommandEnd(callback: () => void): Subscription {
        return this.onCommandEnd.subscribe(callback);
    }

    public emitCommandEnd(): void {
        this.onCommandEnd.next(undefined);
    }
}
