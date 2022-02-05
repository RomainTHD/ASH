/**
 * An entity used by the storage handler
 */
export abstract class Entity {
    protected static category = "TDB";
    protected _id: string;

    protected constructor(id: string) {
        this._id = id;
    }

    public get id(): string {
        return this._id;
    }

    public static create(template: object): Entity {
        void template;
        throw new Error("Not implemented");
    }

    public static find(id: string): Entity | null {
        void id;
        throw new Error("Not implemented");
    }

    public static findAll(): Entity[] {
        throw new Error("Not implemented");
    }

    public static fromJSON(json: object): Entity {
        void json;
        throw new Error("Not implemented");
    }

    public abstract save(): void;

    public abstract delete(): void;

    public abstract toJSON(): object;
}
