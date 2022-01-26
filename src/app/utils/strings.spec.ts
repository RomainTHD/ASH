import {strings} from ".";

describe("Strings", () => {
    it("should split at the right place", () => {
        expect(strings.splitSpace("a b c")).toEqual(["a", "b", "c"]);
        expect(strings.splitSpace("a  b   c")).toEqual(["a", "b", "c"]);
        expect(strings.splitSpace("a  b   c ")).toEqual(["a", "b", "c"]);
        expect(strings.splitSpace("  a  b   c")).toEqual(["a", "b", "c"]);
        expect(strings.splitSpace("  ")).toEqual([]);
        expect(strings.splitSpace("")).toEqual([]);
        expect(strings.splitSpace("foo")).toEqual(["foo"]);
    });

    it("should respect quotes", () => {
        expect(strings.splitSpace(`foo "bar"`)).toEqual(["foo", `"bar"`]);
        expect(strings.splitSpace(`"foo bar"`)).toEqual([`"foo bar"`]);
        expect(strings.splitSpace(`"'foo' bar"`)).toEqual([`"'foo' bar"`]);
    });

    it("should keep inner quotes", () => {
        expect(strings.splitSpace(`'foo"bar'`)).toEqual([`'foo"bar'`]);
        expect(strings.splitSpace(`"'foo' bar"`)).toEqual([`"'foo' bar"`]);
    });

    it("should handle escaped quotes", () => {
        expect(strings.splitSpace(`foo "bar\\""`)).toEqual(["foo", `"bar""`]);
        expect(strings.splitSpace(`foo bar\\'`)).toEqual(["foo", `bar'`]);
        expect(strings.splitSpace(`foo\\"bar`)).toEqual([`foo"bar`]);
    });

    it("should keep escaped backslash", () => {
        expect(strings.splitSpace(`foo "bar\\\\"`)).toEqual(["foo", `"bar\\"`]);
        expect(strings.splitSpace(`foo\\\\bar`)).toEqual(["foo\\bar"]);
    });

    it("should throw on unterminated strings", () => {
        expect(
            () => strings.splitSpace(`foo"bar`),
        ).toThrow(new strings.UnterminatedStringError(3, 7));

        expect(
            () => strings.splitSpace(`"foo\\"`),
        ).toThrow(new strings.UnterminatedStringError(0, 5));
    });
});
