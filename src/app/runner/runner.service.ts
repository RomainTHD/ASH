import {Injectable} from "@angular/core";
import {Command} from "app/cmd";
import {HistoryService} from "app/history/history.service";

@Injectable({
    providedIn: "root",
})
export class RunnerService {
    private _history: HistoryService;

    constructor(history: HistoryService) {
        this._history = history;
    }

    public run(cmd: string): void {
        let args   = cmd.split(" ");
        const path = args.shift() as string;

        Command.execute(path, args).then(() => {
            this._history.pushCommand(cmd);
        });
    }

    public complete(cmd: string) {
    }
}
