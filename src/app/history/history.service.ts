import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({
    providedIn: "root",
})
export class HistoryService {
    public onNewCommand: Subject<string>;

    constructor() {
        this.onNewCommand = new Subject<string>();
    }

    public pushCommand(cmd: string): void {
        this.onNewCommand.next(cmd);
    }
}
