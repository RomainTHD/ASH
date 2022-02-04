import {Env} from "app/env";
import {AnsiColor} from "app/output";
import {
    ExitCode,
    Process,
    Signal,
} from "app/process";
import {ProcessBuilder} from "app/process/process-builder";
import {utils} from "app/utils";
import {Yes} from ".";

describe("Yes", () => {
    // Test function since both tests are really similar
    const testFunction = async (args: string[]): Promise<{ exitCode: ExitCode, output: string }> => {
        let output   = "";
        const stdout = {
            emit: (msg: string = "") => output += `${msg}\n`,
        };

        const stderr = {
            emit: (msg: string = "") => output += `${AnsiColor.FG.RED}${msg}\n`,
        };

        const process = new ProcessBuilder()
            .setProcessClass(Yes)
            .setStdout(stdout)
            .setStderr(stderr)
            .setArgs(Process.processArgs(args))
            .setEnv(new Env())
            .build();

        const promise = process.execute();

        await utils.time.sleep(100);
        process.emitSignal(Signal.SIGINT);
        // Interrupt process after 100ms

        return {
            exitCode: await promise,
            output,
        };
    };

    it("should print a default value and be interrupted", async () => {
        await testFunction([]).then(({exitCode, output}) => {
            expect(exitCode).toBe(ExitCode.Interrupted);
            // It should probably have printed the message at least twice,
            //  but it's not guaranteed. However, we cannot test for an exact
            //  value, and we shouldn't relie on 0 or 1 times
            expect(output.length).toBeGreaterThanOrEqual("y\ny\n".length);
            expect(output).toMatch(/^(y\n)*$/g);
        });
    });

    it("should print a custom value indefinitely", async () => {
        const msg = "Hello world";
        await testFunction([msg]).then(({exitCode, output}) => {
            expect(exitCode).toBe(ExitCode.Interrupted);
            expect(output.length).toBeGreaterThanOrEqual(`${msg}\n${msg}\n`.length);
            expect(output).toMatch(RegExp(`^(${msg}\\n)*$`));
        });
    });
});
