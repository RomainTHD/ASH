import {
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from "@angular/core";
import {
    Env,
    EnvService,
} from "app/env";
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
    public content: string;

    private _outputService: OutputService;
    private _subscriptions: Subscription[];

    constructor(outputService: OutputService, envService: EnvService) {
        this._outputService = outputService;
        this._subscriptions = [];

        this._subscriptions.push(outputService.onNewCommand.subscribe((obj) => {
            this.content += DOMPurify.sanitize(obj.command);
            this.content += "<br/>";
        }));

        this._subscriptions.push(outputService.onNewOutput.subscribe((output) => {
            this.content += DOMPurify.sanitize(output)
                .replace("\n", "<br/>")
                .replace("\r", "");
            this.content += "<br/>";
            this.content += OutputComponent.getPromptText(envService.getEnv());
        }));

        this.content = OutputComponent.getPromptText(envService.getEnv());
    }

    private static getPromptText(env: Env): string {
        const time = new Date().toISOString().split("T")[1].split(".")[0];
        let base   = `${AnsiColor.FG.GREEN}root${AnsiColor.RESET}:` +
            `${AnsiColor.FG.MAGENTA}${time}${AnsiColor.RESET}:` +
            `${AnsiColor.FG.BLUE}${env.cwd}${AnsiColor.RESET}$ `;

        return AnsiColor.parse(DOMPurify.sanitize(base));
    }

    ngOnInit(): void {
    }

    ngOnDestroy() {
        this._subscriptions.forEach((sub) => {
            sub.unsubscribe();
        });
    }
}
