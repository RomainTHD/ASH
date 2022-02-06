import * as utils from ".";

describe("utils.strings", () => {
    const splitSpace = utils.strings.splitSpace;

    it("should split at the right place", () => {
        expect(splitSpace("a b c")).toEqual(["a", "b", "c"]);
        expect(splitSpace("a  b   c")).toEqual(["a", "b", "c"]);
        expect(splitSpace("a  b   c ")).toEqual(["a", "b", "c"]);
        expect(splitSpace("  a  b   c")).toEqual(["a", "b", "c"]);
        expect(splitSpace("  ")).toEqual([]);
        expect(splitSpace("")).toEqual([]);
        expect(splitSpace("foo")).toEqual(["foo"]);
    });

    it("should respect quotes", () => {
        expect(splitSpace(`foo "bar"`)).toEqual(["foo", `"bar"`]);
        expect(splitSpace(`"foo bar"`)).toEqual([`"foo bar"`]);
        expect(splitSpace(`"'foo' bar"`)).toEqual([`"'foo' bar"`]);
    });

    it("should keep inner quotes", () => {
        expect(splitSpace(`'foo"bar'`)).toEqual([`'foo"bar'`]);
        expect(splitSpace(`"'foo' bar"`)).toEqual([`"'foo' bar"`]);
    });

    it("should handle escaped quotes", () => {
        expect(splitSpace(`foo "bar\\""`)).toEqual(["foo", `"bar""`]);
        expect(splitSpace(`foo bar\\'`)).toEqual(["foo", `bar'`]);
        expect(splitSpace(`foo\\"bar`)).toEqual([`foo"bar`]);
    });

    it("should keep escaped backslash", () => {
        expect(splitSpace(`foo "bar\\\\"`)).toEqual(["foo", `"bar\\"`]);
        expect(splitSpace(`foo\\\\bar`)).toEqual(["foo\\bar"]);
    });

    it("should throw on unterminated utils.strings", () => {
        expect(
            () => splitSpace(`foo"bar`),
        ).toThrow(new utils.strings.UnterminatedStringError(3, 7));

        expect(
            () => splitSpace(`"foo\\"`),
        ).toThrow(new utils.strings.UnterminatedStringError(0, 5));
    });
});
