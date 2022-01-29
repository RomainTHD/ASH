import {
    Inode,
    InodeTemplate,
    InodeType,
} from "app/fs";
import {StorageORM} from "app/orm";

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

/**
 * A directory in the file system
 */
export class Directory extends Inode {
    /**
     * Root directory ID
     * @private
     */
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

    /**
     * Get the directory root, aka "/"
     * @returns Root directory
     */
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

    /**
     * Finds a directory by its path
     * @param path Directory path
     * @returns Directory or null if not found
     */
    public static override findFromPath(path: string): Directory | null {
        const inode = super.findFromPath(path);

        if (inode === null || inode.inodeType !== InodeType.Directory) {
            return null;
        }

        return inode as Directory;
    }

    /**
     * Finds a child by name
     * @param name Child name
     * @returns Child or null if not found
     */
    public findChild(name: string): Inode | null {
        const child = this.content.find((child) => child.name === name);
        if (!child) {
            return null;
        }
        return Directory.find(child.id);
    }

    /**
     * Adds a child to the directory
     * @param node Child inode to add
     */
    public addChild(node: Inode): void {
        this.content.push({
            id: node.id,
            name: node.name,
        });
        node.parent = this.id;
        node.save();
        this.save();
    }
}
