describe("Prompt test", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("should have an empty prompt", () => {
        cy.get("#prompt-input").first().should("have.text", "");
    });
});
