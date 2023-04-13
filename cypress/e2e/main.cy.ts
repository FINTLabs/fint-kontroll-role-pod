describe('Search unit titles', () => {

  beforeEach(() => {
    cy.goToHome();

    const baseUrl = "http://localhost:3000/api";
    cy.interceptAndReturnFile("GET", `${baseUrl}/role/?size=5`, "roles.json");
    cy.interceptAndReturnFile("GET", `${baseUrl}/orgunits/`, "orgunits.json");
    cy.interceptAndReturnFile("GET", `${baseUrl}/role/?$filter=roleName%20contains%20%27TEST%27&size=5`, "rolesSearch.json");
    cy.interceptAndReturnFile("GET", `${baseUrl}/role/?$filter=aggregatedRole eq 'true'&size=5`, "rolesAggregated.json");
    cy.interceptAndReturnFile("GET", `${baseUrl}/role/?$filter=aggregatedRole%20eq%20%27true%27&size=10`, "rolesMoreLines.json");
  });

  it('can search and clear input', () => {
    const searchText = 'TEST';

    cy.get('#search-role').should('exist')
    cy.get('#search-role').should('have.attr', 'placeholder', 'Søk gruppenavn');
    cy.get('#search-role').type('{backspace}'.repeat(searchText.length)).should('have.value', '');
    cy.get('#clearIcon').should('not.be.visible');
    cy.get('#search-role').type(searchText).should('have.value', searchText);
    cy.wait(1000)
    cy.get('#search-role').should('be.visible')
    cy.get('#clearIcon').click();
    cy.get('#search-role').should('have.value', '');
  });

  it('should display filter type with default', () => {
    cy.get('#filter-type-select').should('exist')
    cy.get('#filter-type-select-label').should('have.text', 'Brukertype')
    cy.get('#filter-type-select').should('have.text', 'Alle')
  })

  it('Check select type (options, clickable)', () => {
    cy.get('#filter-type-select').click()
    cy.get('[data-value="students"]').click();
    cy.get('#filter-type-select').should('have.text', 'Elev');
  });

  it('Check Select Units (tooltip, dialog, dialog check)', () => {
    cy.get('#selectUnitsIcon').trigger('mouseover')
    cy.get('.MuiTooltip-popper').should('be.visible').contains('Select Units')
    cy.wait(500)
    cy.get('#selectUnitsIcon').click()
    cy.get('#unitsSelectDialog').should('be.visible')
    cy.wait(500)
    //TODO: check dialog check box
    cy.get('#unitDialogCancel').click();
    cy.get('.MuiTooltip-popper').invoke('hide')
    cy.get('.MuiTooltip-popper').should('not.be.visible')
  })


  it('Check aggregated (tooltip, icon change, new list)', () => {
    cy.get('#aggregatedTrue').trigger('mouseover')
    cy.get('.MuiTooltip-popper').should('be.visible').contains('Aggregated')
    cy.wait(1000)
    cy.get('.MuiTooltip-popper').invoke('hide')
    cy.get('.MuiTooltip-popper').should('not.be.visible')
    cy.get('#aggregatedTrue').should('be.visible').click()
    //TODO: check that list changes
    cy.get('#aggregatedFalse').should('be.visible')

  })

  it('Check table (exists, has 5 rows)', () => {
    cy.get('#rolesDataTable')
        .should('be.visible')
        .find('tbody tr')2
        .should('have.length', 5);
  });

  //TODO: Check change page with all buttons
  it('Pagination (change count, change page, new lists)', () => {
    cy.get('#pagination')
        .should('be.visible')
    cy.get('.MuiTablePagination-select').should('exist').select('10')
  });


})