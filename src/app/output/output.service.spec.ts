import {TestBed} from "@angular/core/testing";

import {OutputService} from "app/output";

describe("HistoryService", () => {
    let service: OutputService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(OutputService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
