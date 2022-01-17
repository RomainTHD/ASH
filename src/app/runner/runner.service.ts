import {Injectable} from "@angular/core";
import {Command} from "app/cmd";
import {Env} from "app/env";
import {OutputService} from "app/output/output.service";
import {Process} from "app/process";

@Injectable({
    providedIn: "root",
})
export class RunnerService {
    private _output: OutputService;

    constructor(history: OutputService) {
        this._output = history;
    }

    public run(cmd: string, env: Env): void {
        let args   = cmd.split(" ");
        const path = args.shift() as string;

        this._output.emitCommand(cmd);
        new Process(Command.fromString(path)).execute(args, env, (msg) => this._output.emitOutput(msg)).then();
    }

    public complete(cmd: string) {
    }
}
