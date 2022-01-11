import {Injectable} from "@angular/core";
import {Command} from "cmd";

@Injectable({
    providedIn: "root",
})
export class RunnerService {
    constructor() {
    }

    public run(cmd: string): void {
        let args = cmd.split(" ");
        const path = args.shift() as string;

        Command.execute(path, args).then((result: string) => {
            console.log(result);
        });
    }

    public complete(cmd: string) {
    }
}
