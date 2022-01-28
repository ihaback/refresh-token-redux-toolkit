// ***********************************************
// This example commands.js shows you how to
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

Cypress.Commands.add("loginAsAdmin", () => {
  cy.intercept("POST", "**/login").as("login");
  cy.visit("http://localhost:3000");
  cy.get("#username").type("john");
  cy.get("#password").type("john123");
  cy.get("#login-button").click();
  cy.wait("@login").its("response.statusCode").should("be.oneOf", [200]);
});

Cypress.Commands.add("loginAsUser", () => {
  cy.intercept("POST", "**/login").as("login");
  cy.visit("http://localhost:3000");
  cy.get("#username").type("joe");
  cy.get("#password").type("joe123");
  cy.get("#login-button").click();
  cy.wait("@login").its("response.statusCode").should("be.oneOf", [200]);
});
