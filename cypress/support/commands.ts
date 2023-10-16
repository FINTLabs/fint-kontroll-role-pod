/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
import { Method } from "cypress/types/net-stubbing";

declare global {
    namespace Cypress {
        interface Chainable {
            goToHome: typeof goToHome
            interceptAndReturnFile: typeof interceptAndReturnFile
            setupApiIntercepts: typeof setupApiIntercepts
        }
    }
}

export function interceptAndReturnFile(method: Method, url: string, fixturePath: string) {
    cy.intercept(method, url, {
        fixture: fixturePath,
    }).as(fixturePath);
}
Cypress.Commands.add('interceptAndReturnFile', interceptAndReturnFile)


export function goToHome() {
    return cy.visit('http://localhost:3000/grupper');
}
Cypress.Commands.add('goToHome', goToHome)

const baseUrl = "http://localhost:3000/api";

export function setupApiIntercepts() {
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

}
Cypress.Commands.add('setupApiIntercepts', setupApiIntercepts)



