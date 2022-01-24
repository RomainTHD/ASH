import {TestBed} from "@angular/core/testing";

import {EnvService} from "app/env";

describe("EnvServiceService", () => {
    let service: EnvService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(EnvService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
