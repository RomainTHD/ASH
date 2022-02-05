/**
 * Asserts that the given value is true
 * @param condition Condition to assert
 * @param message Message to print
 */
export function assert(condition: boolean, message = "Assertion failed"): asserts condition {
    // I shouldn't implement this function myself, but webpack seems to not
    //  like the normal `assert` function because of some polyfills requirements.
    if (!condition) {
        throw new Error(message);
    }
}

export default assert;
