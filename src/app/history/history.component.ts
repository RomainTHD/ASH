import {
    Component,
    OnDestroy,
    OnInit,
} from "@angular/core";
import {HistoryService} from "app/history/history.service";
import {Subscription} from "rxjs";

@Component({
    selector: "app-history",
    templateUrl: "./history.component.html",
    styleUrls: ["./history.component.css"],
})
export class HistoryComponent implements OnInit, OnDestroy {
    public commands: string[] = [];

    private _history: HistoryService;
    private _subscription: Subscription;

    constructor(history: HistoryService) {
        this._history      = history;
        this._subscription = history.onNewCommand.subscribe((command) => {
            this.commands.push(command);
        });
    }

    ngOnInit(): void {
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
}
