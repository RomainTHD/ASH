export function assert(condition: boolean, message?: string): asserts condition {
    // I shouldn't implement this function myself, but webpack seems to not
    //  like the normal `assert` function because of some polyfills requirements.
    if (!condition) {
        throw new Error(message || "Assertion failed");
    }
}

export default assert;
