/**
 * Process states
 */
export enum ProcessState {
    /**
     * Created, still not running
     */
    Created = 0,

    /**
     * Running
     */
    Running = 1,

    /**
     * Finished, but not yet cleaned up
     */
    Zombie  = 2,

    /**
     * Sleeping
     */
    Asleep  = 3,
}

// FIXME: Add more states, like `Terminated` ?
