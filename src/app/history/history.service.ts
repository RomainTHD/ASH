import {Injectable} from "@angular/core";

/**
 * History service
 */
@Injectable({
    providedIn: "root",
})
export class HistoryService {
    /**
     * History
     */
    private _history: string[];

    /**
     * History index
     * @private
     */
    private _historyIndex: number;

    constructor() {
        this._history      = [];
        this._historyIndex = 0;
    }

    /**
     * Add a command to the history
     * @param cmd Command
     */
    public pushCommand(cmd: string): void {
        this._history.push(cmd);
        this._historyIndex = this._history.length;
    }

    /**
     * Get the previous command, or null if not available
     * @returns Previous command
     */
    public previousCommand(): string | null {
        if (this._historyIndex > 0) {
            // We have a previous command
            --this._historyIndex;
            return this._history[this._historyIndex];
        }

        return null;
    }

    /**
     * Get the next command, or null if not available
     * @returns Next command
     */
    public nextCommand(): string | null {
        if (this._historyIndex < this._history.length - 1) {
            // We have a next command
            ++this._historyIndex;
            return this._history[this._historyIndex];
        }

        // End of the history
        this._historyIndex = this._history.length;
        return null;
    }

    /**
     * Clear the history
     */
    public clear(): void {
        this._history      = [];
        this._historyIndex = 0;
    }
}
