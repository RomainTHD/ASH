import {Injectable} from "@angular/core";
import {Env} from "app/env";

/**
 * Environment service, allows us to use the current environment across all
 * components
 */
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
