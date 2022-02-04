import {Injectable} from "@angular/core";
import {Command} from "app/cmd";
import {Env} from "app/env";
import {OutputService} from "app/output";
import {
    Process,
    Signal,
} from "app/process";
import {utils} from "app/utils";

@Injectable({
    providedIn: "root",
})
export class RunnerService {
    private _output: OutputService;
    private _process: Process | null;

    constructor(history: OutputService) {
        this._output  = history;
        this._process = null;
    }

    public run(cmd: string, env: Env): void {
        cmd = cmd.trim();
        if (cmd === "") {
            this._output.emitNewCommand("");
            this._output.emitCommandEnd();
            return;
        }

        let argsArr = utils.strings.splitSpace(cmd);
        const path  = (argsArr.shift() as string) || "";
        let args    = Process.processArgs(argsArr);

        const stdout = {
            emit: (msg = "", newLine = true) => {
                return this._output.emitOutput(newLine ? msg + "\n" : msg);
            },
        };

        this._output.emitNewCommand(cmd);
        this._process = Command.fromString(path)
            .setStdout(stdout)
            .setEnv(env)
            .setArgs(args)
            .build();

        this._process.execute().then(() => {
            this._output.emitCommandEnd();
            this._process = null;
        });
    }

    public autoComplete(prefix: string) {
    }

    public emitSignal(signal: Signal): void {
        if (this._process !== null) {
            this._process.emitSignal(signal);
        }
    }
}
