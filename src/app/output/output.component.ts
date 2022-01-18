import {
    Component,
    OnDestroy,
    OnInit,
} from "@angular/core";
import {OutputService} from "app/output/output.service";
import * as DOMPurify from "dompurify";
import {Subscription} from "rxjs";

@Component({
    selector: "app-output",
    templateUrl: "./output.component.html",
    styleUrls: ["./output.component.scss"],
})
export class OutputComponent implements OnInit, OnDestroy {
    public content: string = "";

    private _outputService: OutputService;
    private _subscriptions: Subscription[];

    constructor(outputService: OutputService) {
        this._outputService = outputService;
        this._subscriptions = [];

        this._subscriptions.push(outputService.onNewCommand.subscribe((obj) => {
            this.content += DOMPurify.sanitize(obj.command);
            this.content += "<br/>";
        }));

        this._subscriptions.push(outputService.onNewOutput.subscribe((output) => {
            this.content += DOMPurify.sanitize(output).replace("\n", "<br/>").replace("\r", "");
            this.content += "<br/>";
        }));
    }

    ngOnInit(): void {
    }

    ngOnDestroy() {
        this._subscriptions.forEach((sub) => {
            sub.unsubscribe();
        });
    }
}
