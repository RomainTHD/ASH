import {
    Component,
    OnInit,
} from "@angular/core";
import {EnvService} from "app/env";
import {RunnerService} from "app/runner";

interface Prompt {
    cmd: string;
}

@Component({
    selector: "app-prompt",
    templateUrl: "./prompt.component.html",
    styleUrls: ["./prompt.component.scss"],
})
export class PromptComponent implements OnInit {
    public prompt: Prompt;

    private _runner: RunnerService;
    private _env: EnvService;

    constructor(runner: RunnerService, env: EnvService) {
        this._runner = runner;
        this._env    = env;
        this.prompt  = {
            cmd: "",
        };
    }

    ngOnInit(): void {
    }

    onInput(targetRaw: Event): void {
        const target    = (targetRaw.target) as HTMLDivElement;
        this.prompt.cmd = target.innerText;
    }

    onEnter(targetRaw: Event) {
        const target = (targetRaw.target) as HTMLDivElement;
        this._runner.run(this.prompt.cmd, this._env.getEnv());
        this.prompt.cmd  = "";
        target.innerText = "";
    }

    onTab() {
        this._runner.complete(this.prompt.cmd);
    }
}
