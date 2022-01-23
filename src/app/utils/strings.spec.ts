import {strings} from "app/utils";
import {UnterminatedStringError} from "app/utils/strings";

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
        expect(() => strings.splitSpace(`foo"bar`)).toThrow(new UnterminatedStringError(3, 7));
        expect(() => strings.splitSpace(`"foo\\"`)).toThrow(new UnterminatedStringError(0, 5));
    });
});
