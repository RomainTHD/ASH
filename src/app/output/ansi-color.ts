export abstract class AnsiColor {
    public static readonly RESET = "\x1b[0m";

    public static readonly BOLD          = "\x1b[1m";
    public static readonly ITALIC        = "\x1b[3m";
    public static readonly UNDERLINE     = "\x1b[4m";
    public static readonly STRIKETHROUGH = "\x1b[9m";

    public static readonly FG = {
        BLACK: "\x1b[30m",
        RED: "\x1b[31m",
        GREEN: "\x1b[32m",
        YELLOW: "\x1b[33m",
        BLUE: "\x1b[34m",
        MAGENTA: "\x1b[35m",
        CYAN: "\x1b[36m",
        WHITE: "\x1b[37m",
    };

    public static readonly BG = {
        BLACK: "\x1b[40m",
        RED: "\x1b[41m",
        GREEN: "\x1b[42m",
        YELLOW: "\x1b[43m",
        BLUE: "\x1b[44m",
        MAGENTA: "\x1b[45m",
        CYAN: "\x1b[46m",
        WHITE: "\x1b[47m",
    };
}
