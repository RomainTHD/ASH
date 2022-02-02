import {utils} from ".";

describe("Front", () => {
    const msg = "Hello World";

    it("should return an HTML element", () => {
        const element = utils.front.stringToHTML(`<span>${msg}</span>`, true);
        expect(element).toBeInstanceOf(HTMLSpanElement);
        expect((element as HTMLSpanElement).innerText).toBe(msg);
    });

    it("should return a `div` element", () => {
        const element = utils.front.stringToHTML(msg);
        expect(element).toBeInstanceOf(HTMLDivElement);
        expect((element as HTMLDivElement).innerText).toBe(msg);
    });
});
