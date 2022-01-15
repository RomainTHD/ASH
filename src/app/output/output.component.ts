import {
    Component,
    OnDestroy,
    OnInit,
} from "@angular/core";
import {
    Entry,
    OutputService,
} from "app/output/output.service";
import {Subscription} from "rxjs";

@Component({
    selector: "app-output",
    templateUrl: "./output.component.html",
    styleUrls: ["./output.component.css"],
})
export class OutputComponent implements OnInit, OnDestroy {
    public commands: Entry[] = [];

    private _outputService: OutputService;
    private _subscription: Subscription;

    constructor(outputService: OutputService) {
        this._outputService = outputService;
        this._subscription  = outputService.onNewCommand.subscribe((command) => {
            this.commands.push(command);
        });
    }

    ngOnInit(): void {
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
}
