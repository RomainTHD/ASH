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

export interface DirectoryTemplate extends Partial<InodeTemplate> {
    content?: DirectoryChild[];
    name: string;
    parent: string;
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

    public static override create(template: DirectoryTemplate): Directory {
        const now = new Date();
        // We create the directory object with all its properties
        const dir = new Directory({
            content: template.content || [],
            created: now,
            id: template.id || StorageORM.getNewID(Inode.category),
            inodeType: InodeType.Directory,
            modified: now,
            name: template.name,
            owner: template.owner || "root",
            parent: template.parent || this.getRoot().id,
            size: 0,
        });
        // Save it to the storage
        dir.save();

        // Special case for the root directory "/", where its parent is itself
        if (dir.id !== Directory.ROOT_DIRECTORY_ID) {
            const parent = Directory.find(dir.parent) as Directory;
            if (!parent) {
                throw new Error("Parent directory not found");
            }
            parent.addChild(dir);
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
            root = this.create({
                id: Directory.ROOT_DIRECTORY_ID,
                name: "",
                parent: Directory.ROOT_DIRECTORY_ID,
            });
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
