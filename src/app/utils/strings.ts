export class UnterminatedStringError extends Error {
    public constructor(
        public readonly start: number,
        public readonly end: number,
    ) {
        super(`Unterminated string, from ${start} to ${end}`);
    }
}

/**
 * Split a string on spaces, but not on spaces inside of quotes.
 * Also handle escaped quotes.
 * @param str String to split
 * @param keepQuotes Keep quotes in the result or not
 * @returns Array of strings
 */
export function splitSpace(str: string, keepQuotes = true): string[] {
    const res   = [];
    let current = "";

    let quoteMode: string | null = null;
    let escaped                  = false;

    let start  = -1;
    let length = str.length;

    str.split("").forEach((c, i) => {
        switch (c) {
            case " ":
                if (quoteMode === null) {
                    if (current !== "") {
                        res.push(current);
                        current = "";
                    }
                } else {
                    current += c;
                }
                break;

            case "\\":
                if (escaped) {
                    current += "\\";
                } else {
                    --length;
                }
                escaped = !escaped;
                break;

            case "\"":
            case "'":
            case "`":
                if (escaped) {
                    current += c;
                    escaped = false;
                } else if (quoteMode === c) {
                    quoteMode = null;
                    if (keepQuotes) {
                        current += c;
                    }
                } else if (quoteMode !== null) {
                    current += c;
                } else {
                    quoteMode = c;
                    start     = i;
                    if (keepQuotes) {
                        current += c;
                    }
                }
                break;

            default:
                current += c;
        }
    });

    if (current != "") {
        res.push(current);
    }

    if (quoteMode !== null) {
        throw new UnterminatedStringError(start, length);
    }

    return res;
}
