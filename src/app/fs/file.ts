import {
    Directory,
    Inode,
    InodeTemplate,
    InodeType,
} from "app/fs";
import {StorageORM} from "app/orm/storageORM";

export interface FileTemplate {
    name: string;
    parent: string;
    owner: string;
    content: string;
}

export class File extends Inode {
    public constructor(template: InodeTemplate) {
        super(template);
    }

    public override get content(): string {
        return super.content as string;
    }

    public override set content(value: string) {
        super.content = value;
    }

    public static override create(template: FileTemplate): File {
        const now = new Date();
        const f   = new File({
            ...template,
            inodeType: InodeType.File,
            id: StorageORM.getNewID(Inode.category),
            size: 0,
            created: now,
            modified: now,
        });
        f.save();

        const dir = Directory.find(f.parent) as Directory;
        if (!dir) {
            throw new Error("Parent directory not found");
        }
        dir.addChild(f);
        dir.save();

        return f;
    }

    public static override fromJSON(json: InodeTemplate): File {
        return new this(json);
    }

    public static findFromPath(path: string): File | null {
        const items = path.split("/");
        if (items.length <= 1) {
            return null;
        }

        const fileName = items.pop() as string;
        const parent   = Directory.findFromPath(items.join("/"));
        if (!parent) {
            return null;
        }

        const node = parent.findChild(fileName);
        if (!node || node.inodeType !== InodeType.File) {
            return null;
        }

        return node as File;
    }
}
