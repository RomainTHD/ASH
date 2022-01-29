import {
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from "@angular/core";
import {EnvService} from "app/env";
import {OutputService} from "app/output";
import * as DOMPurify from "dompurify";
import {Subscription} from "rxjs";

@Component({
    selector: "app-output",
    templateUrl: "./output.component.html",
    styleUrls: ["./output.component.scss"],
    encapsulation: ViewEncapsulation.None, // Because we use raw HTML / CSS tags
})
export class OutputComponent implements OnInit, OnDestroy {
    public content: string;

    private _outputService: OutputService;
    private _subscriptions: Subscription[];

    constructor(outputService: OutputService, envService: EnvService) {
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
            this.content += DOMPurify.sanitize(output)
                .replace("\n", "<br/>")
                .replace("\r", "");
        }));

        this._subscriptions.push(outputService.subscribeCommandEnd(() => {
        }));

        this.content = "";
    }

    ngOnInit(): void {
    }

    ngOnDestroy() {
        this._subscriptions.forEach((sub) => {
            sub.unsubscribe();
        });
    }
}
