import {
    ComponentFixture,
    TestBed,
} from "@angular/core/testing";

import {PromptComponent} from ".";

describe("ShellComponent", () => {
    let component: PromptComponent;
    let fixture: ComponentFixture<PromptComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PromptComponent],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture   = TestBed.createComponent(PromptComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
