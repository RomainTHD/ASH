import {
    Component,
    OnDestroy,
    ViewEncapsulation,
} from "@angular/core";
import {
    AnsiColor,
    OutputService,
} from "app/output";
import * as DOMPurify from "dompurify";
import {Subscription} from "rxjs";

@Component({
    selector: "app-output",
    templateUrl: "./output.component.html",
    styleUrls: ["./output.component.scss"],
    encapsulation: ViewEncapsulation.None, // Because we use raw HTML / CSS tags
})
export class OutputComponent implements OnDestroy {
    public content: string;

    private _outputService: OutputService;
    private _subscriptions: Subscription[];

    constructor(outputService: OutputService) {
        this._outputService = outputService;
        this._subscriptions = [];

        this._subscriptions.push(outputService.subscribePromptMessage((msg) => {
            this.content += msg;
        }));

        this._subscriptions.push(outputService.subscribeNewCommand((obj) => {
            this.content += DOMPurify.sanitize(obj.command);
            this.content += "<br/>";
        }));

        this._subscriptions.push(outputService.subscribeOutput((output) => {
            this.content += AnsiColor.parse(DOMPurify.sanitize(output)
                .replace("\n", "<br/>")
                .replace("\r", ""));
        }));

        this._subscriptions.push(outputService.subscribeCommandEnd(() => {
            // Do nothing for now
        }));

        this.content = "";
    }

    ngOnDestroy() {
        this._subscriptions.forEach((sub) => {
            sub.unsubscribe();
        });
    }
}
