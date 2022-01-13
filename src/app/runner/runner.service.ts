import {Injectable} from "@angular/core";
import {Command} from "app/cmd";
import {Env} from "app/env";
import {HistoryService} from "app/history/history.service";

@Injectable({
    providedIn: "root",
})
export class RunnerService {
    private _history: HistoryService;

    constructor(history: HistoryService) {
        this._history = history;
    }

    public run(cmd: string, env: Env): void {
        let args   = cmd.split(" ");
        const path = args.shift() as string;

        Command.execute(path, args, env).then(() => {
            this._history.pushCommand(cmd);
        });
    }

    public complete(cmd: string) {
    }
}
