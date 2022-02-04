import {Command} from "app/cmd/command";
import {Pwd} from ".";

describe("Pwd", () => {
    it("should create an instance", () => {
        expect(Command.fromString("pwd").processClass).toBe(Pwd);
    });
});
