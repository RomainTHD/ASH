import {Entity} from "orm/entity";
import {StorageORM} from "orm/storageORM";

export interface InodeTemplate {
    name: string;
    parent: number;
    owner: number;
}

export class Inode extends Entity {
    protected static override category = "inode";

    private _name: string;
    private _size: number;
    private readonly _created: Date;
    private _modified: Date;
    private _parent: number;

    protected constructor(
        id: string,
        name: string,
        size: number,
        created: Date,
        modified: Date,
        parent: number,
    ) {
        super(id);
        this._name     = name;
        this._size     = size;
        this._created  = created;
        this._modified = modified;
        this._parent   = parent;
    }

    public get parent(): number {
        return this._parent;
    }

    public set parent(value: number) {
        this._parent = value;
    }

    public get modified(): Date {
        return this._modified;
    }

    public set modified(value: Date) {
        this._modified = value;
    }

    public get created(): Date {
        return this._created;
    }

    public get size(): number {
        return this._size;
    }

    public set size(value: number) {
        this._size = value;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public static override create(template: InodeTemplate): Entity {
        const now = new Date();
        return new Inode(
            StorageORM.getNewID(Inode.category),
            template.name,
            0,
            now,
            now,
            template.parent,
        );
    }

    public static override find(id: string): Entity | null {
        const json = StorageORM.read(Inode.category, id);
        if (json === null) {
            return null;
        }

        return this.fromJSON(JSON.parse(json));
    }

    public static override findAll(): Entity[] {
        return StorageORM.readAll(Inode.category).map((json) => this.fromJSON(JSON.parse(json)));
    }

    public static override fromJSON(json: Inode): Entity {
        return new this(
            json.id,
            json.name,
            json.size,
            json.created,
            json.modified,
            json.parent,
        );
    }

    public delete(): void {
        StorageORM.delete(Inode.category, this.id);
    }

    public save(): void {
        StorageORM.write(Inode.category, this.id, JSON.stringify(this));
    }

    public toJSON(): object {
        return {
            id: this.id,
            name: this.name,
            size: this.size,
            created: this.created,
            modified: this.modified,
            parent: this.parent,
        };
    }
}
