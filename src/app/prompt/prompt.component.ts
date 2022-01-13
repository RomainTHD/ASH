import {
    Component,
    OnInit,
} from "@angular/core";
import {RunnerService} from "app/runner/runner.service";

interface Prompt {
    cmd: string;
}

@Component({
    selector: "app-prompt",
    templateUrl: "./prompt.component.html",
    styleUrls: ["./prompt.component.css"],
})
export class PromptComponent implements OnInit {
    public prompt: Prompt = {
        cmd: "",
    };

    private _runner: RunnerService;

    constructor(runner: RunnerService) {
        this._runner = runner;
    }

    ngOnInit(): void {
    }

    onEnter() {
        this._runner.run(this.prompt.cmd);
        this.prompt.cmd = "";
    }

    onTab() {
        this._runner.complete(this.prompt.cmd);
    }
}
