import {
    Component,
    OnInit,
} from "@angular/core";
import {Env} from "app/env";
import {RunnerService} from "app/runner/runner.service";

interface Prompt {
    env: Env,
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

    constructor(runner: RunnerService) {
        this._runner = runner;
        this.prompt  = {
            cmd: "",
            env: new Env(null),
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
        this._runner.run(this.prompt.cmd, this.prompt.env);
        this.prompt.cmd  = "";
        target.innerText = "";
    }

    onTab() {
        this._runner.complete(this.prompt.cmd);
    }
}
