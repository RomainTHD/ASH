import {
    ComponentFixture,
    TestBed,
} from "@angular/core/testing";

import {OutputComponent} from ".";

describe("HistoryComponent", () => {
    let component: OutputComponent;
    let fixture: ComponentFixture<OutputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OutputComponent],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture   = TestBed.createComponent(OutputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
