import {
    Directory,
    File,
} from "app/fs";
import {
    Entity,
    StorageORM,
} from "app/orm";

export enum InodeType {
    File,
    Directory,
    Link,
    Socket,
    Device,
    NamedPipe,
    BlockDevice,
    CharacterDevice,
    FIFO,
    Unknown,
}

export interface InodeTemplate {
    content: unknown,
    created: Date,
    id: string,
    inodeType: InodeType;
    modified: Date,
    name: string,
    owner: string,
    parent: string,
    size: number,
}

/**
 * An inode in the file system
 */
export abstract class Inode extends Entity {
    /**
     * The inode category for the ORM
     * @protected
     */
    protected static override category = "inode";
    private readonly _inodeType: InodeType;
    private _name: string;
    private _size: number;
    private readonly _created: Date;
    private _modified: Date;
    private _parent: string;
    private _owner: string;
    private _content: unknown;

    protected constructor(
        template: InodeTemplate,
    ) {
        super(template.id);
        this._inodeType = template.inodeType;
        this._name      = template.name;
        this._size      = template.size;
        this._created   = template.created;
        this._modified  = template.modified;
        this._parent    = template.parent;
        this._owner     = template.owner;
        this._content   = template.content;
    }

    public get owner(): string {
        return this._owner;
    }

    public set owner(value: string) {
        this._owner = value;
    }

    public get inodeType(): InodeType {
        return this._inodeType;
    }

    public get parent(): string {
        return this._parent;
    }

    public set parent(value: string) {
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

    protected get content(): unknown {
        return this._content;
    }

    protected set content(value: unknown) {
        this._content = value;
    }

    public static override find(id: string): Inode | null {
        const json = StorageORM.read(Inode.category, id);
        if (json === null) {
            return null;
        }

        return this.fromJSON(JSON.parse(json));
    }

    public static override fromJSON(json: InodeTemplate): Inode {
        switch (json.inodeType) {
            case InodeType.File:
                return File.fromJSON(json);

            case InodeType.Directory:
                return Directory.fromJSON(json);

            default:
                throw new Error("Unknown inode type");
        }
    }

    public static override findAll(): Entity[] {
        return StorageORM.readAll(Inode.category).map((json) => this.fromJSON(JSON.parse(json)));
    }

    /**
     * Finds an inode by its path
     * @param path Inode path
     * @returns Inode or null if not found
     */
    public static findFromPath(path: string): Inode | null {
        const items = path.split("/");

        let inodeName = items.pop();
        if (inodeName === "") {
            // For directories, if the path ends with a slash,
            //  the last item is an empty string
            inodeName = items.pop();
        }

        if (items[0] === "") {
            items.shift(); // Remove root "/"
        }

        let parent: Directory | null = Directory.getRoot();
        for (let i = 0; i < items.length; ++i) {
            const item = items[i];
            if (parent === null) {
                return null;
            } else {
                const child = parent.findChild(item);
                if (child === null) {
                    return null;
                } else {
                    parent = child as Directory;
                }
            }
        }

        if (inodeName === "") {
            // We're asking for the root directory
            return parent;
        } else {
            return parent.findChild(inodeName as string);
        }
    }

    public override delete(): void {
        StorageORM.delete(Inode.category, this.id);
    }

    public override save(): void {
        StorageORM.write(Inode.category, this.id, JSON.stringify(this));
    }

    public override toJSON(): InodeTemplate {
        return {
            inodeType: this.inodeType,
            id: this.id,
            name: this.name,
            size: this.size,
            created: this.created,
            modified: this.modified,
            parent: this.parent,
            owner: this.owner,
            content: this.content,
        };
    }
}
