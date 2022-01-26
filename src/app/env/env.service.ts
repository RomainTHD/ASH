import {Injectable} from "@angular/core";
import {Env} from "app/env";

@Injectable({
    providedIn: "root",
})
export class EnvService {
    private static _env: Env;

    constructor() {
        EnvService._env = new Env();
    }

    public getEnv(): Env {
        return EnvService._env;
    }
}
