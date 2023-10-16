describe("Page accessibility tests", () => {
    beforeEach(() => {
        cy.setupApiIntercepts();

        cy.visit('/grupper');
        cy.injectAxe();
    });

    it("Should have no accessibility violations",() => {
        cy.checkA11y();
    });
});