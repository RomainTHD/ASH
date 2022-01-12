export abstract class Entity {
    protected static category: string = "TDB";
    protected _id: string;

    protected constructor(id: string) {
        this._id = id;
    }

    public get id(): string {
        return this._id;
    }

    public static create(template: object): Entity {
        throw new Error("Not implemented");
    }

    public static find(id: string): Entity | null {
        throw new Error("Not implemented");
    }

    public static findAll(): Entity[] {
        throw new Error("Not implemented");
    }

    public static fromJSON(json: object): Entity {
        throw new Error("Not implemented");
    }

    public abstract save(): void;

    public abstract delete(): void;

    public abstract toJSON(): object;
}
