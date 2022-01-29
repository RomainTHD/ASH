import {
    Directory,
    Inode,
    InodeTemplate,
    InodeType,
} from "app/fs";
import {StorageORM} from "app/orm";

export interface FileTemplate {
    name: string;
    parent: string;
    owner: string;
    content: string;
}

/**
 * A file in the file system
 */
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

    /**
     * Finds a file by its path
     * @param path File path
     * @returns File or null if not found
     */
    public static override findFromPath(path: string): File | null {
        const inode = super.findFromPath(path);

        if (inode === null || inode.inodeType !== InodeType.File) {
            return null;
        }

        return inode as File;
    }
}
