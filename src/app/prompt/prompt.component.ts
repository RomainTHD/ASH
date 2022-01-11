import {
    Component,
    OnInit,
} from "@angular/core";
import {RunnerService} from "runner/runner.service";

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

    private runner: RunnerService;

    constructor(runner: RunnerService) {
        this.runner = runner;
    }

    ngOnInit(): void {
    }

    onEnter() {
        this.runner.run(this.prompt.cmd);
        this.prompt.cmd = "";
    }

    onTab() {
        this.runner.complete(this.prompt.cmd);
    }
}
