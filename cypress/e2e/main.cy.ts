describe('Check the MAIN page with no backend', () => {
  const searchText = 'fy';

  beforeEach(() => {
    const baseUrl = "http://localhost:3000/api";
    cy.interceptAndReturnFile("GET", `${baseUrl}/orgunits`, "orgunits.json");
    cy.interceptAndReturnFile("GET", `${baseUrl}/roles/?roletype=ALLTYPES&size=5`, "roles.json");
    //TODO: add a user type when that is ready
    cy.interceptAndReturnFile("GET", `${baseUrl}/roles?roletype=ALLTYPES&size=5`, "roles.json");
    cy.interceptAndReturnFile("GET", `${baseUrl}/roles?search=f&roletype=ALLTYPES&size=5`, "rolesSearch.json");
    cy.interceptAndReturnFile("GET", `${baseUrl}/roles?search=fy&roletype=ALLTYPES&size=5`, "rolesSearch.json");
    cy.interceptAndReturnFile("GET", `${baseUrl}/roles?roletype=elev&size=5`, "rolesFilter.json");
    cy.interceptAndReturnFile("GET", `${baseUrl}/roles?userType=students&aggroles=true&orgunits=1&size=5`, "rolesAggregated.json");
    cy.interceptAndReturnFile("GET", `${baseUrl}/roles?$filter=aggregatedRole%20eq%20%27true%27&size=10`, "rolesMoreLines.json");
    cy.interceptAndReturnFile("GET", `${baseUrl}/roles?roletype=elev&orgunits=5&size=5`, "rolesWithOrgUnitId.json");
    cy.interceptAndReturnFile("GET", `${baseUrl}/roles?roletype=elev&orgunits=5,26,27,30,35,36,37,50,1178,1119,1120,38,46,47,48,1163,40&size=5`, "rolesAggregated.json");

  });

  it('can type in search and clear input', () => {

    cy.goToHome();
    cy.get('#search-role').should('exist')
    cy.get('#search-role').should('have.attr', 'placeholder', 'Søk gruppenavn')
    cy.get('#search-role').should('have.value', '')
    // cy.get('#search-role').type('{backspace}'.repeat(searchText.length)).should('have.value', '')
    cy.get('#clearIcon').should('not.be.visible')
    cy.get('#search-role').type(searchText).should('have.value', searchText)
    cy.wait(1000)
    cy.get('#search-role').should('be.visible')
    cy.get('#clearIcon').click();
    cy.get('#search-role').should('have.value', '')
  });

  it('Check table (exists, has 5 rows)', () => {
    cy.get('#rolesDataTable')
        .should('be.visible')
        .find('tbody tr')
        .should('have.length', 5);
  });

  it('should display filter type with default', () => {
    cy.get('#filter-type-select').should('exist')
    cy.get('#filter-type-select-label').should('have.text', 'Brukertype')
    cy.get('#filter-type-select').should('have.text', 'Alle')
  })

  it('Check select type (options, clickable)', () => {
    cy.get('#filter-type-select').click()
    cy.get('[data-value="elev"]').click()
    cy.get('#filter-type-select').should('have.text', 'Elev')
  });

  it('Check Select Units', () => {
    cy.get('#selectUnitsIcon').trigger('mouseover')
    cy.get('.MuiTooltip-popper').should('be.visible').contains('Velg enhet')
    cy.wait(500)
    cy.get('#selectUnitsIcon').click()
    cy.get('#unitsSelectDialog').should('be.visible')
    cy.wait(500)
    cy.get('.MuiTreeItem-root').first().click()
    cy.get('#node-5').click()
    cy.get('#closeDialog').click()
  })

  it('Check Select Units (aggregated)', () => {
    cy.get('#selectUnitsIcon').trigger('mouseover')
    cy.get('.MuiTooltip-popper').should('be.visible').contains('Velg enhet')
    cy.wait(500)
    cy.get('#selectUnitsIcon').click()
    cy.get('#unitsSelectDialog').should('be.visible')
    cy.wait(500)
    cy.get('.MuiTreeItem-root').first().click()
    cy.get('#node-5').click()
    cy.get('#aggregatedCheckbox').as('aggregatedSwitch');
    cy.get('@aggregatedSwitch').should('not.be.checked');
    cy.get('@aggregatedSwitch').click();
    cy.get('#node-5').click()
    cy.get('#closeDialog').click()
    // cy.get('@aggregatedSwitch').should('be.checked');
  })

  // //TODO: Check change page with all buttons
  // it('Pagination (change count, change page, new lists)', () => {
  //   cy.get('#pagination')
  //       .should('be.visible')
  //   cy.get('.MuiTablePagination-select').should('exist').select('10')
  // });

// })
//
// //TODO write tests for the DEATILS page
// describe('Check the DETAILS PAGE tab with no backend', () => {
//   const searchText = 'Dahl';
//
//   beforeEach(() => {
//     const baseUrl = "http://localhost:3000/api";
//     cy.interceptAndReturnFile("GET", `${baseUrl}/member/role/43/?size=5`, "members.json");
//   });
//
//   //todo check title, other details, two tabs exist
//   it('Click into a members page', () => {
//     // cy.goToHome();
//     cy.get('#role-43').click()
//   });
//
//   //todo
//   it('Members tab (exits, title, table, search)', () => {
//     // cy.goToHome();
//     cy.get('#tableTitle').should('have.text','Members')
//   });
//
//   //TODO
//   it('Resrouces tab (exits, title, table, search)', () => {
//     // cy.goToHome();
//     cy.get('.MuiTabs-flexContainer > [tabindex="-1"]').should('have.text','Resources')
//   });

})