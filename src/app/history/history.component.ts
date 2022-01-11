import {
    Component,
    OnInit,
} from "@angular/core";

@Component({
    selector: "app-history",
    templateUrl: "./history.component.html",
    styleUrls: ["./history.component.css"],
})
export class HistoryComponent implements OnInit {
    commands: string[] = ["ls", "cat"];

    constructor() {
    }

    ngOnInit(): void {
    }
}
