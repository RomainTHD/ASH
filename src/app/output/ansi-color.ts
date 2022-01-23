const FG_CLASS = "fg";
const BG_CLASS = "bg";

/**
 * Ansi color codes
 */
export class AnsiColor {
    /**
     * Reset all styles
     */
    public static readonly RESET = new AnsiColor("\x1b[0m", "reset");

    public static readonly BOLD          = new AnsiColor("\x1b[1m", "bold");
    public static readonly ITALIC        = new AnsiColor("\x1b[3m", "italic");
    public static readonly UNDERLINE     = new AnsiColor("\x1b[4m", "underline");
    public static readonly STRIKETHROUGH = new AnsiColor("\x1b[9m", "strikethrough");

    /**
     * Foreground colors
     */
    public static readonly FG = {
        BLACK: new AnsiColor("\x1b[30m", "black"),
        RED: new AnsiColor("\x1b[31m", "red"),
        GREEN: new AnsiColor("\x1b[32m", "green"),
        YELLOW: new AnsiColor("\x1b[33m", "yellow"),
        BLUE: new AnsiColor("\x1b[34m", "blue"),
        MAGENTA: new AnsiColor("\x1b[35m", "magenta"),
        CYAN: new AnsiColor("\x1b[36m", "cyan"),
        WHITE: new AnsiColor("\x1b[37m", "white"),
    };

    /**
     * Background colors
     */
    public static readonly BG = {
        BLACK: new AnsiColor("\x1b[40m", "black"),
        RED: new AnsiColor("\x1b[41m", "red"),
        GREEN: new AnsiColor("\x1b[42m", "green"),
        YELLOW: new AnsiColor("\x1b[43m", "yellow"),
        BLUE: new AnsiColor("\x1b[44m", "blue"),
        MAGENTA: new AnsiColor("\x1b[45m", "magenta"),
        CYAN: new AnsiColor("\x1b[46m", "cyan"),
        WHITE: new AnsiColor("\x1b[47m", "white"),
    };

    /**
     * Nasty hack to create pseudo-reflection and avoid iterating over all
     * static properties of the class.
     * @private
     */
    private __flag_is_ansi = true;

    /**
     * Ansi color code
     * @private
     */
    private readonly _ansi: string;

    /**
     * CSS class name
     * @private
     */
    private readonly _class: string;

    private constructor(ansi: string, cls: string) {
        this._ansi  = ansi;
        this._class = cls;
    }

    /**
     * Parse some text with ANSI color codes
     * @param text Text to parse
     * @returns Parsed text
     */
    public static parse(text: string): string {
        // Split on each reset, and will add for each part the right amount of
        //  closing tags
        let parts = text.split(this.RESET._ansi).map((part) => {
            let count = 0;

            const processPart = (obj: { 1: AnsiColor }, classModifier: string | null) => {
                const color: AnsiColor = obj[1];
                if (!color.__flag_is_ansi) {
                    // Our pseudo-reflection, maybe we should remove it
                    //  and instead check the keys ?
                    return;
                }

                // FIXME: Only replaced once ?
                const ansi = color._ansi.replace("\[", "\\\[");
                count += (part.match(new RegExp(ansi, "gm")) || []).length;

                const cls = (classModifier ? classModifier + "--" : "") + color._class;
                part      = part.replace(color._ansi, `<span class="${cls}">`);
            };

            // Process all basic tags
            Object.entries(this).forEach((obj) => {
                processPart(obj, null);
            });

            // Process all bg color tags
            Object.entries(this.BG).forEach((obj) => {
                processPart(obj, BG_CLASS);
            });

            // Process all fg color tags
            Object.entries(this.FG).forEach((obj) => {
                processPart(obj, FG_CLASS);
            });

            // Insert the right amount of closing tags
            return part + "</span>".repeat(count);
        });

        return parts.join("");
    }

    public toString(): string {
        return this._ansi;
    }
}
