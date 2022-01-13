import {
    Inode,
    InodeTemplate,
    InodeType,
} from "app/fs";
import {StorageORM} from "app/orm/storageORM";

export interface DirectoryChild {
    id: string,
    name: string,
}

export interface DirectoryTemplate {
    name: string;
    parent: string;
    owner: string;
    content: DirectoryChild[];
}

export class Directory extends Inode {
    public constructor(template: InodeTemplate) {
        super(template);
    }

    public override get content(): DirectoryChild[] {
        return super.content as DirectoryChild[];
    }

    public override set content(value: DirectoryChild[]) {
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

    public static getRoot(): Directory {
        let root = this.find("root") as Directory;
        if (root === null) {
            // throw new Error("Root directory not found");
            root = this.create({
                name: "",
                parent: "",
                owner: "root",
                content: [],
            });
        }

        return root;
    }

    public static findFromPath(path: string): Directory | null {
        path = path.endsWith("/") ? path : path + "/";

        const items = path.split("/");
        items.pop(); // Remove last item, which has to be empty

        let current: Directory | null = this.getRoot();
        for (const item of items) {
            if (current === null) {
                return null;
            } else {
                const child = current.findChild(item);
                if (child === null || child.inodeType !== InodeType.Directory) {
                    return null;
                } else {
                    current = child as Directory;
                }
            }
        }

        return current;
    }

    public findChild(name: string): Inode | null {
        const child = this.content.find((child) => child.name === name);
        if (!child) {
            return null;
        }
        return Directory.find(child.id);
    }
}