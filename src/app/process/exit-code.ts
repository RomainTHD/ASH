/**
 * Process exit code
 */
export enum ExitCode {
    Success = 0,
    Failure = 1,
    Interrupted,
    Timeout,
    Unknown,
    Unsupported,
    Unauthorized,
    NotFound,
    Invalid,
    MissingArgument,
    InvalidArgument,
}
