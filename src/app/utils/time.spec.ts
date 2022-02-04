import {utils} from ".";

describe("Time", () => {
    it("should sleep for the given amount of time", async () => {
        const ms = 100;
        const start = Date.now();
        await utils.time.sleep(ms);
        const end = Date.now();
        expect(end - start).toBeGreaterThanOrEqual(ms);
    });
});
