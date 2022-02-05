import * as utils from "app/utils";
import {AnsiColor} from ".";

describe("AnsiColor", () => {
    const msg = "Hello world";

    it("should keep the original text", () => {
        expect(AnsiColor.parse(msg)).toEqual(msg);
        expect(AnsiColor.parse(`${AnsiColor.RESET}${msg}`)).toEqual(msg);
        expect(AnsiColor.parse(`${msg}${AnsiColor.RESET}`)).toEqual(msg);
    });

    it("should write the right HTML tag", () => {
        const color = AnsiColor.FG.BLUE;
        const msg   = "test";
        const txt   = AnsiColor.parse(`${color}${msg}${AnsiColor.RESET}`);
        const elt   = utils.front.stringToHTML(txt, true);
        expect(elt).toBeInstanceOf(HTMLSpanElement);
        expect(elt.classList).toContain(`fg--${color.className}`);
        // FIXME: Not the best way to test the color,
        //  we should instead test the CSS
        expect(elt.innerText).toEqual(msg);
    });
});
