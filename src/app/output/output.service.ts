import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

export interface CommandEntry {
    command: string;
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

    constructor() {
        this.onNewCommand = new Subject<CommandEntry>();
        this.onNewOutput  = new Subject<string>();
    }

    public emitCommand(command: string): void {
        this.onNewCommand.next({
            command,
            time: new Date(),
        });
    }

    public emitOutput(output: string) {
        this.onNewOutput.next(output);
    }
}
