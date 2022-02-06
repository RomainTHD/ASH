export class BuilderPatternError extends Error {
    public constructor() {
        super("Partial builder pattern error.");
    }
}

export class NotImplementerError extends Error {
    public constructor() {
        super("Not implemented.");
    }
}
