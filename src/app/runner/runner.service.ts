import {Injectable} from "@angular/core";
import {Command} from "app/cmd";
import {Env} from "app/env";
import {OutputService} from "app/output";
import {Process} from "app/process";
import {strings} from "app/utils";

@Injectable({
    providedIn: "root",
})
export class RunnerService {
    private _output: OutputService;

    constructor(history: OutputService) {
        this._output = history;
    }

    public run(cmd: string, env: Env): void {
        cmd = cmd.trim();
        if (cmd === "") {
            this._output.emitNewCommand("", env);
            this._output.emitCommandEnd();
            return;
        }

        let argsArr = strings.splitSpace(cmd);
        const path  = (argsArr.shift() as string) || "";
        let args    = Process.processArgs(argsArr);

        this._output.emitNewCommand(cmd, env);
        Command.fromString(path).execute(
            args,
            env,
            (msg, newLine = true) => {
                msg = newLine ? msg + "\n" : msg;
                return this._output.emitOutput(msg);
            },
        ).then(() => {
            this._output.emitCommandEnd();
        });
    }

    public complete(cmd: string) {
    }
}
