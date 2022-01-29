import {Env} from "app/env";
import {AnsiColor} from "app/output";
import * as DOMPurify from "dompurify";

export {PromptComponent} from "./prompt.component";

export function getPromptText(env: Env): string {
    const time = new Date().toISOString().split("T")[1].split(".")[0];
    let base   = `${AnsiColor.FG.GREEN}root${AnsiColor.RESET}:` +
        `${AnsiColor.FG.MAGENTA}${time}${AnsiColor.RESET}:` +
        `${AnsiColor.FG.BLUE}${env.cwd}${AnsiColor.RESET}$&nbsp;`;

    return AnsiColor.parse(DOMPurify.sanitize(base));
}
