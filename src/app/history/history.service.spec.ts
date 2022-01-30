import {TestBed} from "@angular/core/testing";

import {HistoryService} from "./history.service";

describe("HistoryService", () => {
    let history: HistoryService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        history = TestBed.inject(HistoryService);
        history.clear();
    });

    it("should be created", () => {
        expect(history).toBeTruthy();
    });

    it("should return the right command when empty", () => {
        expect(history.previousCommand()).toBeNull();
        expect(history.nextCommand()).toBeNull();
    });

    it("should return the right command with one command", () => {
        history.pushCommand("foo");

        expect(history.previousCommand()).toBe("foo");
        expect(history.previousCommand()).toBeNull();
        expect(history.nextCommand()).toBeNull();
        expect(history.nextCommand()).toBeNull();
        expect(history.previousCommand()).toBe("foo");
    });

    it("should return the right command with multiple commands", () => {
        history.pushCommand("foo");
        history.pushCommand("bar");
        history.pushCommand("baz");

        expect(history.nextCommand()).toBeNull();

        expect(history.previousCommand()).toBe("baz");
        expect(history.previousCommand()).toBe("bar");
        expect(history.previousCommand()).toBe("foo");
        expect(history.previousCommand()).toBeNull();

        expect(history.nextCommand()).toBe("bar");
        expect(history.nextCommand()).toBe("baz");
        expect(history.nextCommand()).toBeNull();

        expect(history.previousCommand()).toBe("baz");
        expect(history.previousCommand()).toBe("bar");
        expect(history.nextCommand()).toBe("baz");
        expect(history.previousCommand()).toBe("bar");
        expect(history.nextCommand()).toBe("baz");
        expect(history.nextCommand()).toBeNull();
    });
});
