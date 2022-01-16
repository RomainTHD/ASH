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
    private static readonly ROOT_DIRECTORY_ID = "root";

    public constructor(template: InodeTemplate) {
        super(template);
    }

    public override get content(): DirectoryChild[] {
        return super.content as DirectoryChild[];
    }

    public override set content(value: DirectoryChild[]) {
        super.content = value;
    }

    public static override create(template: DirectoryTemplate, id?: string): Directory {
        const now = new Date();
        const dir = new Directory({
            ...template,
            inodeType: InodeType.Directory,
            id: id || StorageORM.getNewID(Inode.category),
            size: 0,
            created: now,
            modified: now,
            content: template.content,
        });
        dir.save();

        if (dir.id !== Directory.ROOT_DIRECTORY_ID) {
            const parent = Directory.find(dir.parent) as Directory;
            if (!parent) {
                throw new Error("Parent directory not found");
            }
            parent.addChild(dir);
            parent.save();
        }

        return dir;
    }

    public static override fromJSON(json: InodeTemplate): Directory {
        return new this(json);
    }

    public static getRoot(): Directory {
        let root = this.find(Directory.ROOT_DIRECTORY_ID) as Directory;
        if (root === null) {
            // throw new Error("Root directory not found");
            root = this.create({
                name: "",
                parent: Directory.ROOT_DIRECTORY_ID,
                owner: "root",
                content: [],
            }, Directory.ROOT_DIRECTORY_ID);
        }

        return root;
    }

    public static findFromPath(path: string): Directory | null {
        const items = path.split("/");
        items.pop(); // Remove last item, which has to be empty

        if (items[0] === "") {
            items.shift(); // Remove root "/"
        }

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

    public addChild(node: Inode): void {
        this.content.push({
            id: node.id,
            name: node.name,
        });
    }
}
