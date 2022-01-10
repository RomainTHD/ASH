import {
    Component,
    OnInit,
} from "@angular/core";

interface Shell {
    command: string;
}

@Component({
    selector: "app-shell",
    templateUrl: "./shell.component.html",
    styleUrls: ["./shell.component.css"],
})
export class ShellComponent implements OnInit {
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
