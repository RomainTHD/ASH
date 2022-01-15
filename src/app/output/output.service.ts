import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

export interface Entry {
    command: string;
    time: Date;
    output: string,
}

@Injectable({
    providedIn: "root",
})
export class OutputService {
    public onNewCommand: Subject<Entry>;

    constructor() {
        this.onNewCommand = new Subject<Entry>();
    }

    public pushCommand(command: string, output: string): void {
        this.onNewCommand.next({
            command,
            time: new Date(),
            output,
        });
    }
}
