import {Env} from "app/env";
import {AnsiColor} from "app/output";
import * as DOMPurify from "dompurify";

export {PromptComponent} from "./prompt.component";

/**
 * Get the prompt text for a shell, like "root@localhost:~$"
 * @param env Environment
 * @returns Prompt text
 */
export function getPromptText(env: Env): string {
    const time = new Date().toISOString().split("T")[1].split(".")[0];
    const base = `${AnsiColor.FG.GREEN}root${AnsiColor.RESET}:` +
        `${AnsiColor.FG.MAGENTA}${time}${AnsiColor.RESET}:` +
        `${AnsiColor.FG.BLUE}${env.getCwd()}${AnsiColor.RESET}$&nbsp;`;

    return AnsiColor.parse(DOMPurify.sanitize(base));
}
