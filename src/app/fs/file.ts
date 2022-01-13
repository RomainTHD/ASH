import {
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
        return new File({
            ...template,
            inodeType: InodeType.File,
            id: StorageORM.getNewID(Inode.category),
            size: 0,
            created: now,
            modified: now,
        });
    }

    public static override fromJSON(json: InodeTemplate): File {
        return new this(json);
    }
}
