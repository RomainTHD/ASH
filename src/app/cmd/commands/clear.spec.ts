import {Command} from "app/cmd";
import {Clear} from ".";

describe("Clear", () => {
    it("should create an instance", () => {
        expect(Command.fromString("clear").processClass).toBe(Clear);
    });
});
