describe("Title test", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("should have the correct title", () => {
        cy.title().should("equal", "ASH");
    });
});
