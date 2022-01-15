import {Injectable} from "@angular/core";
import {Command} from "app/cmd";
import {Env} from "app/env";
import {OutputService} from "app/output/output.service";

@Injectable({
    providedIn: "root",
})
export class RunnerService {
    private _history: OutputService;

    constructor(history: OutputService) {
        this._history = history;
    }

    public run(cmd: string, env: Env): void {
        let args   = cmd.split(" ");
        const path = args.shift() as string;

        Command.execute(path, args, env).then((result) => {
            this._history.pushCommand(cmd, result);
        });
    }

    public complete(cmd: string) {
    }
}
