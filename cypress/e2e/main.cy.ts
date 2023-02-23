describe('template spec', () => {

  it('Check main page has correct title', () => {
    cy.viewport(1536, 768);
    cy.visit('http://localhost:3000');
    cy.get(':nth-child(1) > :nth-child(1) > .MuiTypography-root').should("contain", "Grupper")
  });

  it('Check that the first filter works', () => {
    cy.viewport(1536, 768);
    cy.visit('http://localhost:3000');
    cy.get(':nth-child(1) > .MuiInputBase-root > #filter-unit-select-autowidth').should("be.visible");
    cy.get(':nth-child(1) > .MuiInputBase-root > #filter-unit-select-autowidth').click();

  });
})