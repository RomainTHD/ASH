export {Command} from "./command";
import * as regularCommands from "./commands";
import * as internalCommands from "./internal";

const {...regular} = regularCommands;
const {...internal} = internalCommands;
const commands = {...regular, ...internal};

export {
    commands,
    regularCommands,
    internalCommands,
};
export * from "./commands";
export * from "./internal";
