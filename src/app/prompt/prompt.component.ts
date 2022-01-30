import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from "@angular/core";
import {EnvService} from "app/env";
import {OutputService} from "app/output";
import {getPromptText} from "app/prompt/index";
import {RunnerService} from "app/runner";

interface Prompt {
    cmd: string;
    message: string;
}

@Component({
    selector: "app-prompt",
    templateUrl: "./prompt.component.html",
    styleUrls: ["./prompt.component.scss"],
})
export class PromptComponent implements OnInit, AfterViewInit {
    @ViewChild("promptElement")
    public promptElement?: ElementRef;

    public prompt: Prompt;

    private _runner: RunnerService;
    private _env: EnvService;
    private _output: OutputService;

    constructor(runner: RunnerService, env: EnvService, output: OutputService) {
        this._runner = runner;
        this._env    = env;
        this._output = output;
        this.prompt  = {
            cmd: "",
            message: getPromptText(env.getEnv()),
        };
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        (this.promptElement as ElementRef).nativeElement.focus();
    }

    onInput(targetRaw: Event): void {
        const target    = (targetRaw.target) as HTMLDivElement;
        this.prompt.cmd = target.innerText;
    }

    onEnter(targetRaw: Event) {
        const target = (targetRaw.target) as HTMLDivElement;
        this._output.emitPromptMessage(this.prompt.message);
        this._runner.run(this.prompt.cmd, this._env.getEnv());
        target.innerText = "";
        this.prompt      = {
            cmd: "",
            message: getPromptText(this._env.getEnv()),
        };
    }

    onTab() {
        this._runner.complete(this.prompt.cmd);
    }
}
