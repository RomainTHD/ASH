import {
    Component,
    OnInit,
} from "@angular/core";
import {Shell} from "src/app/shell"

@Component({
    selector: "app-shell",
    templateUrl: "./shell.component.html",
    styleUrls: ["./shell.component.css"],
})
export class ShellComponent implements OnInit {
    shell: Shell = {
        id: 1,
        name: "ash",
    };

    constructor() {
    }

    ngOnInit(): void {
    }

}
