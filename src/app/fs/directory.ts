import {
    Inode,
    InodeTemplate,
    InodeType,
} from "app/fs";
import {StorageORM} from "app/orm/storageORM";

export interface DirectoryTemplate {
    name: string;
    parent: string;
    owner: string;
    content: string[];
}

export class Directory extends Inode {
    public constructor(template: InodeTemplate) {
        super(template);
    }

    public override get content(): string[] {
        return super.content as string[];
    }

    public override set content(value: string[]) {
        super.content = value;
    }

    public static override create(template: DirectoryTemplate): Directory {
        const now = new Date();
        return new Directory({
            ...template,
            inodeType: InodeType.File,
            id: StorageORM.getNewID(Inode.category),
            size: 0,
            created: now,
            modified: now,
            content: template.content,
        });
    }

    public static override fromJSON(json: InodeTemplate): Directory {
        return new this(json);
    }
}
