import {AnsiColor} from "app/output/ansi-color";

describe("AnsiColor", () => {
    it("should keep the original text", () => {
        expect(AnsiColor.parse("test")).toEqual("test");
        expect(AnsiColor.parse(`${AnsiColor.RESET}test`)).toEqual("test");
        expect(AnsiColor.parse(`test${AnsiColor.RESET}`)).toEqual("test");
    });
});
