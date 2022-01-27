import {
    Command,
    commands,
} from ".";

describe("Command", () => {
    it("should return the right command", () => {
        const assoc: Record<string, typeof Command> = commands;
        Object.keys(assoc).forEach((key) => {
            const currentClass = assoc[key];
            expect(currentClass.command).not.toBeNull();
            const cmd = Command.fromString(currentClass.command as string);
            expect(cmd).toBeInstanceOf(currentClass);
        });
    });
});
