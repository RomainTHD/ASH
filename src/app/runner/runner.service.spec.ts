import {TestBed} from "@angular/core/testing";

import {RunnerService} from ".";

describe("RunnerService", () => {
    let service: RunnerService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(RunnerService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
