import {
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from "@angular/core";
import {AnsiColor} from "app/output/ansi-color";
import {OutputService} from "app/output/output.service";
import * as DOMPurify from "dompurify";
import {Subscription} from "rxjs";

@Component({
    selector: "app-output",
    templateUrl: "./output.component.html",
    styleUrls: ["./output.component.scss"],
    encapsulation: ViewEncapsulation.None, // Because we use raw HTML / CSS tags
})
export class OutputComponent implements OnInit, OnDestroy {
    public content: string = "";

    private _outputService: OutputService;
    private _subscriptions: Subscription[];

    constructor(outputService: OutputService) {
        this._outputService = outputService;
        this._subscriptions = [];

        this._subscriptions.push(outputService.onNewCommand.subscribe((obj) => {
            const time = obj.time.toISOString().split("T")[1].split(".")[0];

            let base = `${AnsiColor.FG.GREEN}root${AnsiColor.RESET}:` +
                `${AnsiColor.FG.MAGENTA}${time}${AnsiColor.RESET}:` +
                `${AnsiColor.FG.BLUE}${obj.env.cwd}${AnsiColor.RESET}$ `;

            this.content += AnsiColor.parse(DOMPurify.sanitize(base));
            this.content += DOMPurify.sanitize(obj.command);
            this.content += "<br/>";
        }));

        this._subscriptions.push(outputService.onNewOutput.subscribe((output) => {
            this.content += DOMPurify.sanitize(output)
                .replace("\n", "<br/>")
                .replace("\r", "");
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
