import {Command} from "app/cmd";
import {Ls} from ".";

describe("Ls", () => {
    it("should create an instance", () => {
        expect(Command.fromString("ls").processClass).toBe(Ls);
    });
});
