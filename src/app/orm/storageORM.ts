export abstract class StorageORM {
    private static readonly columnLastID = "_lastID";

    public static read(category: string, id: string): string | null {
        return localStorage.getItem(this.mergeID(category, id));
    }

    public static write(category: string, id: string, value: string): void {
        localStorage.setItem(this.mergeID(category, id), value);
    }

    public static delete(category: string, id: string): void {
        localStorage.removeItem(this.mergeID(category, id));
    }

    public static getNewID(category: string): string {
        if (this.read(category, this.columnLastID) === null) {
            this.write(category, this.columnLastID, "0");
        }

        const id = parseInt(this.read(category, this.columnLastID) as string);
        this.write(category, this.columnLastID, (id + 1).toString());
        return id.toString();
    }

    public static readAll(category: string): string[] {
        const result: string[] = [];

        const lastID = parseInt(this.read(category, this.columnLastID) as string);
        if (!isNaN(lastID)) {
            for (let i = 0; i < lastID; ++i) {
                const value = this.read(category, i.toString());
                if (value !== null) {
                    result.push(value);
                }
            }
        }

        return result;
    }

    private static mergeID(category: string, id: string): string {
        return `${category}_${id}`;
    }
}
