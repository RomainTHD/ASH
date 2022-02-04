import {Command} from "app/cmd";
import {Env} from "app/env";
import {
    Arguments,
    ExitCode,
    Process,
} from "app/process";
import {utils} from ".";

/**
 * Execute a string command
 * @param cmdStr Command as a string
 * @param args Arguments to pass to the command.
 * If empty, the arguments will be parsed from the command string
 * @param env Environment to pass to the command
 * @returns Exit code and command output
 */
export async function executeCommand(
    cmdStr: string,
    args: Arguments | null = null,
    env: Env | null        = null,
): Promise<{ exitCode: ExitCode, output: string }> {
    let argsArr = utils.strings.splitSpace(cmdStr);
    const path  = (argsArr.shift() as string) || "";

    if (!args) {
        args = Process.processArgs(argsArr);
    }

    if (!env) {
        env = new Env();
    }

    let output   = "";
    const stdout = {
        emit: (msg: string = "") => output += msg,
    };

    const cmd = Command.fromString(path)
        .setArgs(args)
        .setStdout(stdout)
        .setEnv(env)
        .build();

    const exitCode = await cmd.execute();
    return {exitCode, output};
}
