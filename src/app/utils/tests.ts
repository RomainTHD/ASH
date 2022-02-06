import {Command} from "app/cmd";
import {Env} from "app/env";
import {AnsiColor} from "app/output";
import {
    Arguments,
    ExitCode,
    Process,
    Signal,
} from "app/process";
import * as utils from ".";

interface _ExecuteCommandReturnValue {
    exitCode: ExitCode;
    stdout: string;
    stderr: string;
}

/**
 * Execute a string command
 * @param cmdStr Command as a string
 * @param args Arguments to pass to the command.
 * If empty, the arguments will be parsed from the command string
 * @param env Environment to pass to the command
 * @param killAfter Number of milliseconds to wait before killing the process
 * @returns Exit code and command output
 */
export async function executeCommand(
    cmdStr: string,
    args: Arguments | null   = null,
    env: Env | null          = null,
    killAfter: number | null = null,
): Promise<_ExecuteCommandReturnValue> {
    const argsArr = utils.strings.splitSpace(cmdStr);
    const path    = (argsArr.shift() as string) || "";

    if (!args) {
        args = Process.processArgs(argsArr);
    }

    if (!env) {
        env = new Env();
    }

    let stdout         = "";
    const stdoutStream = {
        emit: (msg = "", newLine = true) => {
            stdout += msg + (newLine ? "\n" : "");
        },
    };

    let stderr         = "";
    const stderrStream = {
        emit: (msg = "", newLine = true) => {
            stderr += AnsiColor.FG.RED + msg + (newLine ? "\n" : "");
        },
    };

    const cmd = Command.fromString(path)
        .setArgs(args)
        .setStdout(stdoutStream)
        .setStderr(stderrStream)
        .setEnv(env)
        .build();

    const promise = cmd.execute();

    if (killAfter !== null) {
        // Interrupt process
        await utils.time.sleep(killAfter);
        cmd.emitSignal(Signal.SIGINT);
    }

    const exitCode = await promise;

    return {
        exitCode,
        stdout,
        stderr,
    };
}
