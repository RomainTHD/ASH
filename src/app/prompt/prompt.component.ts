import {
    Component,
    OnInit,
} from "@angular/core";

interface Shell {
    command: string;
}

@Component({
    selector: "app-prompt",
    templateUrl: "./prompt.component.html",
    styleUrls: ["./prompt.component.css"],
})
export class PromptComponent implements OnInit {
    constructor() {
    }

    ngOnInit(): void {
    }

    onEnter(cmd: string) {
        console.log(cmd);
    }

    onTab(cmd: string) {
        console.log(cmd);
    }
}
