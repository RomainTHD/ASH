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
        let argsArr = cmd.split(" ");
        const path  = argsArr.shift() as string;
        let args    = Process.processArgs(argsArr);

        this._output.emitCommand(cmd, env);
        Command.fromString(path).execute(args, env, (msg) => this._output.emitOutput(msg)).then();
    }

    public complete(cmd: string) {
    }
}
