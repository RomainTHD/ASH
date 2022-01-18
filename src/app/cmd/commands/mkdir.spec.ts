import {Mkdir} from "app/cmd";

describe("Mkdir", () => {
    it("should create an instance", () => {
        expect(new Mkdir()).toBeTruthy();
    });
});
