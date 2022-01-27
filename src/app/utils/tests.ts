import {Command} from "app/cmd";
import {Env} from "app/env";
import {
    Arguments,
    ExitCode,
    Process,
} from "app/process";
import {strings} from ".";

/**
 * Execute a string command
 * @param cmdStr Command as a string
 * @param args Arguments to pass to the command.
 * If empty, the arguments will be parsed from the command string
 * @returns Exit code and command output
 */
export async function executeCommand(
    cmdStr: string,
    args?: Arguments,
): Promise<{ exitCode: ExitCode, output: string }> {
    let argsArr = strings.splitSpace(cmdStr);
    const path  = (argsArr.shift() as string) || "";

    if (!args) {
        args = Process.processArgs(argsArr);
    }

    const cmd = Command.fromString(path);

    let output = "";
    const emit = (msg: string) => output += msg;

    const exitCode = await cmd.execute(args, new Env(), emit);
    return {exitCode, output};
}
