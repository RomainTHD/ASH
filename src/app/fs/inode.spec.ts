import {Inode} from "./inode";

describe("Inode", () => {
    it("should create an instance", () => {
        expect(new Inode()).toBeTruthy();
    });
});
