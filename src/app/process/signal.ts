/**
 * Signals
 */
export enum Signal {
    SIGABRT,
    SIGALRM,
    SIGBUS,
    SIGCHLD,
    SIGCLD,

    /**
     * Awake a sleeping process
     * @see SIGSTOP
     */
    SIGCONT,
    SIGEMT,
    SIGFPE,
    SIGHUP,
    SIGILL,
    SIGINFO,

    /**
     * Keyboard interrupt
     */
    SIGINT,
    SIGIO,
    SIGIOT,

    /**
     * Kill signal
     */
    SIGKILL,
    SIGLOST,
    SIGPIPE,
    SIGPOLL,
    SIGPROF,
    SIGPWR,
    SIGQUIT,
    SIGSEGV,
    SIGSTKFLT,

    /**
     * Put a process to sleep
     * @see SIGCONT
     */
    SIGSTOP,
    SIGTSTP,
    SIGSYS,
    SIGTERM,
    SIGTRAP,
    SIGTTIN,
    SIGTTOU,
    SIGUNUSED,
    SIGURG,

    /**
     * User defined signal 1
     */
    SIGUSR1,

    /**
     * User defined signal 2
     */
    SIGUSR2,
    SIGVTALRM,
    SIGXCPU,
    SIGXFSZ,
    SIGWINCH,
}
