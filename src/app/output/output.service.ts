import {Injectable} from "@angular/core";
import {Env} from "app/env";
import {Subject} from "rxjs";

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
    public onNewCommand: Subject<CommandEntry>;
    public onNewOutput: Subject<string>;
    public onCommandEnd: Subject<undefined>;

    constructor() {
        this.onNewCommand = new Subject<CommandEntry>();
        this.onNewOutput  = new Subject<string>();
        this.onCommandEnd = new Subject<undefined>();
    }

    public emitCommand(command: string, env: Env): void {
        this.onNewCommand.next({
            command,
            env,
            time: new Date(),
        });
    }

    public emitOutput(output: string) {
        this.onNewOutput.next(output);
    }

    public emitCommandEnd() {
        this.onCommandEnd.next(undefined);
    }
}
