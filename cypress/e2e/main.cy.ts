describe('Filters', () => {
  beforeEach(() => {
    cy.goToHome()
  })

  it('should display default filter names', () => {
    // cy.get('#filter-name-select-label').should('have.text', 'Navn')
    cy.get('#filter-unit-select-label').should('have.text', 'Enhet')
    cy.get('#filter-type-select-label').should('have.text', 'Brukertype')
  })

    it('Check the name filter', () => {
      cy.get('#filter-name-select-label').should('have.text', 'Navn')
      cy.get('#filter-name-select').contains("All")
      cy.get('#filter-name-select').click()
      cy.get('.MuiList-root .MuiMenuItem-root').should('have.length.greaterThan', 1)

      cy.wait(500)

    })
    // THIS IS NOT WORKING YET #TODO
    // it('should have more than 1 value', () => {
    //   cy.get('#filter-name-select').click()
    //
    //   cy.get('#myDataTable')
    //       .find("tr")
    //       .then((row) => {
    //         //row.length will give you the row count
    //         cy.log("rows in the table",row.length);
    //       });
    //
    //   cy.get('.MuiList-root .MuiMenuItem-root').each(($el, index, $list) => {
    //     cy.log("FROM A TEST")
    //     cy.log($el.data().value)
    //     $el.trigger("click")
    //
    //
    //   })
    // })

})