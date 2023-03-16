describe('Filters', () => {
  beforeEach(() => {
    // cy.goToHome()
  })

  it('should display default filter names', () => {
    // cy.get('#filter-name-select-label').should('have.text', 'Navn')
    cy.goToHome()
    cy.get('#filter-unit-select-label').should('have.text', 'Enhet')
    cy.get('#filter-type-select-label').should('have.text', 'Brukertype')
  })

    it('Check the name filter', () => {
      cy.get('#filter-name-select-label').should('have.text', 'Navn')
      cy.get('#filter-name-select').contains("All")
      cy.get('#filter-name-select').click()
      cy.get('.MuiList-root .MuiMenuItem-root').should('have.length.greaterThan', 1)

      cy.wait(500)

      cy.get('[data-value="Name2"]').click()

      // cy.get('.MuiList-root .MuiMenuItem-root').each(($el, index, $list) => {
      //   $el.trigger("click")
      //   console.log($list[index].dataset.valueOf()["value"])
      // })
    })

  it('Check the unit filter', () => {
    cy.get('#filter-unit-select-label').should('have.text', 'Enhet')
    cy.get('#filter-unit-select').contains("All")
    cy.get('#filter-unit-select').click()
    cy.get('.MuiList-root .MuiMenuItem-root').should('have.length.greaterThan', 1)

    cy.wait(500)
    cy.get('[data-value="UnitA"]').click()
  })

  it('Check the user type filter', () => {
    cy.get('#filter-type-select-label').should('have.text', 'Brukertype')
    cy.get('#filter-type-select').contains("All")
    cy.get('#filter-type-select').click()
    cy.get('.MuiList-root .MuiMenuItem-root').should('have.length.greaterThan', 1)

    cy.wait(500)
    cy.get('[data-value="students"]').click()
  })

  it('Check the user type filter', () => {
    cy.get('#search-role').click()
    cy.get('#search-role').type("Testing search")

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
  // cy.get('.MuiList-root .MuiMenuItem-root').each(($el, index, $list) => {
  //   $el.trigger("click")
  //   console.log($list[index].dataset.valueOf()["value"])
  // })
    //
    //   })
    // })

})