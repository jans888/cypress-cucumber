import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I go to {string}', (url) => {
  cy.visit(url);
});

Then('I see title {string}', (title) => {
  cy.title().should('equal', title);
});

Then('I see text {string}', (text) => {
  cy.get('body').should('contain', text);
});

Then('I see link {string}', (text) => {
  cy.xpath(`//a[text()="${text}"]`).should('have.length', 1);
});