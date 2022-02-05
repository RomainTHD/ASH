import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
    ViewChild,
} from "@angular/core";
import {EnvService} from "app/env";
import {HistoryService} from "app/history";
import {OutputService} from "app/output";
import {Signal} from "app/process";
import {getPromptText} from "app/prompt";
import {RunnerService} from "app/runner";
import * as utils from "app/utils";

/**
 * Prompt view model
 */
interface Prompt {
    /**
     * Command typed
     */
    cmd: string;

    /**
     * Prompt prefix message
     */
    message: string;
}

/**
 * Arrow direction for the history
 */
enum ArrowDir {
    UP,
    DOWN
}

/**
 * Prompt component
 */
@Component({
    selector: "app-prompt",
    templateUrl: "./prompt.component.html",
    styleUrls: ["./prompt.component.scss"],
})
export class PromptComponent implements AfterViewInit {
    /**
     * View DOM element for the prompt input
     */
    @ViewChild("promptElement")
    public promptElement?: ElementRef;

    /**
     * Model for the view
     */
    public prompt: Prompt;

    /**
     * The DOM element cannot directly access `ArrowDir`, so we forward its
     * values as public variables
     * @see ArrowDir
     */
    public readonly ARROW_UP   = ArrowDir.UP;
    public readonly ARROW_DOWN = ArrowDir.DOWN;

    /**
     * Runner service
     * @see RunnerService
     * @private
     */
    private _runner: RunnerService;

    /**
     * Environment service
     * @see EnvService
     * @private
     */
    private _env: EnvService;

    /**
     * Output service
     * @see OutputService
     * @private
     */
    private _output: OutputService;

    /**
     * History service
     * @see HistoryService
     * @private
     */
    private _history: HistoryService;

    /**
     * Allows us to check whether we were in the history previously or not,
     * because we only want to erase the prompt input if we were in the history
     * @private
     */
    private _previousInput: string | null;

    public constructor(
        runner: RunnerService,
        env: EnvService,
        output: OutputService,
        history: HistoryService,
    ) {
        this._runner  = runner;
        this._env     = env;
        this._output  = output;
        this._history = history;
        this.prompt   = {
            cmd: "",
            message: getPromptText(env.getEnv()),
        };

        this._previousInput = null;
    }

    /**
     * Initialize the component after the view is loaded. This is where we
     * load the DOM element to the TS component, and focus the input
     */
    public ngAfterViewInit(): void {
        (this.promptElement as ElementRef).nativeElement.focus();
    }

    /**
     * Input typed, we update the model
     */
    public onInput(): void {
        this._setPromptCmd(this._getInputContent(), false);
    }

    /**
     * Enter key pressed, we add the command to the history and execute it
     */
    public onEnter(): void {
        const cmd = this.prompt.cmd;
        this._output.emitPromptMessage(this.prompt.message);
        this._history.pushCommand(cmd);
        this._runner.run(cmd, this._env.getEnv());
        this.prompt = {
            cmd: "",
            message: getPromptText(this._env.getEnv()),
        };
        this._updateView();
    }

    /**
     * Catch the Ctrl-C event, and emit it to the runner
     */
    @HostListener("document:keydown.control.c", ["$event"])
    onCtrlC(event: KeyboardEvent) {
        event.preventDefault();
        this._runner.emitSignal(Signal.SIGINT);
        this._output.emitPromptMessage(this.prompt.message);
        this._output.emitNewCommand(`${this.prompt.cmd}^C`);
        this.prompt = {
            cmd: "",
            message: getPromptText(this._env.getEnv()),
        };
        this._updateView();
        this._output.emitCommandEnd();
    }

    /**
     * Tab key pressed, we autocomplete the command (WIP)
     */
    public onTab(): void {
        this._runner.autoComplete(this.prompt.cmd);
    }

    /**
     * Arrow key handler, we move in the history
     * @param dir Arrow direction
     * @see ArrowDir
     */
    public onArrow(dir: ArrowDir): void {
        if (dir === ArrowDir.UP) {
            const cmd = this._history.previousCommand();
            if (cmd !== null && this._previousInput === null) {
                // Backup the current input if we're not already in the history
                this._previousInput = this.prompt.cmd;
            }
            this._setPromptCmd(cmd || this.prompt.cmd);
        } else {
            const cmd = this._history.nextCommand();
            if (cmd === null) {
                // Restore the previous input if we're at the end of the history
                if (this._previousInput !== null) {
                    // Avoid erasing the input if we type the down key twice
                    this._setPromptCmd(this._previousInput);
                    this._previousInput = null;
                }
            } else {
                this._setPromptCmd(cmd);
            }
        }
    }

    /**
     * Return the prompt message without HTML tags.
     * Useful for a hack in the prompt view where the margin is set dynamically
     * @returns Prompt message without HTML tags
     */
    public getVanillaPromptMessage(): string {
        return utils.front.stripHTML(this.prompt.message);
    }

    /**
     * We refresh the view if it differs from the model
     * @param forceRefresh Force a view refresh
     * @private
     */
    private _updateView(forceRefresh = false): void {
        if (forceRefresh || this.prompt.cmd !== this._getInputContent()) {
            (this.promptElement as ElementRef).nativeElement.innerText = this.prompt.cmd;
        }
    }

    /**
     * Get the content of the input view element
     * @returns Content of the input element
     * @private
     */
    private _getInputContent(): string {
        return (this.promptElement as ElementRef).nativeElement.innerText;
    }

    /**
     * Set the prompt command and update both the view and the model
     * @param cmd Command to set
     * @param updateView If we should update the view or not
     * @private
     */
    private _setPromptCmd(cmd: string, updateView = true): void {
        this.prompt.cmd = cmd.trim();
        if (updateView) {
            this._updateView();
        }
    }
}
