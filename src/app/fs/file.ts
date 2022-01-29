import {
    Directory,
    Inode,
    InodeTemplate,
    InodeType,
} from "app/fs";
import {StorageORM} from "app/orm";

export interface FileTemplate extends Partial<InodeTemplate> {
    content?: string;
    name: string;
    parent: string;
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
            content: template.content || "",
            created: now,
            id: template.id || StorageORM.getNewID(Inode.category),
            inodeType: InodeType.File,
            modified: now,
            name: template.name,
            owner: template.owner || "root",
            parent: template.parent || Directory.getRoot().id,
            size: 0,
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
