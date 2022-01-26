import {
    Cat,
    Cd,
    Command,
    Echo,
    Ls,
    Mkdir,
    Noop,
    NotFound,
    Pwd,
    Reset,
    Touch,
} from ".";

describe("Command", () => {
    it("should return the right command", () => {
        const assoc: Record<string, typeof Command> = {
            "cat": Cat,
            "cd": Cd,
            "echo": Echo,
            "ls": Ls,
            "mkdir": Mkdir,
            "pwd": Pwd,
            "touch": Touch,
        };

        Object.keys(assoc).forEach((key) => {
            const cmd = Command.fromString(key);
            expect(cmd).toBeInstanceOf(assoc[key]);
        });
    });

    it("should return the right internal command", () => {
        const assoc: Record<string, typeof Command> = {
            "__reset": Reset,
            "": Noop,
            "__unknown": NotFound,
        };

        Object.keys(assoc).forEach((key) => {
            const cmd = Command.fromString(key);
            expect(cmd).toBeInstanceOf(assoc[key]);
        });
    });
});
