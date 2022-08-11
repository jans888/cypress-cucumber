import { root as websiteObjects } from '../pageObjects/website'

Cypress.Commands.add('visitWebsite', (website) => { 
    cy.visit(website)
 })

 Cypress.Commands.add('selectDropDown', (formControlName, selectOption) => { 
    cy.get(formControlName).click().then(() => {
        cy.get(`${formControlName} ul.dropdown-menu`).should('contain', selectOption);
        cy.get(`${formControlName} ul.dropdown-menu li:contains("${selectOption}")`).first().click().then(() => {
            cy.get(`${formControlName}`).contains(selectOption)
        })
    })
 })

 Cypress.Commands.add('checkResponse', (routeAlias, retries) => { 
    cy.wait(routeAlias).then(response => {
        cy.wait(1000)
        if (response.response.statusCode === 200) return
        else if (retries > 0) this.checkStatus(routeAlias, retries - 1)
        else throw "All requests returned non 200 status code"
    })
 })

 Cypress.Commands.add('inputSearchFields', (caption, eventPlace, dateFrom, dateTo) => { 
    
    cy.get(websiteObjects.page.homePage.captionField).type(caption)
    cy.get(websiteObjects.page.homePage.captionLabel).click()
    cy.selectDropDown(websiteObjects.page.homePage.eventPlace, eventPlace)
    cy.get(websiteObjects.page.homePage.dateFrom).type(dateFrom)
    cy.get(websiteObjects.page.homePage.dateLabel).click()
    cy.get(websiteObjects.page.homePage.dateTo).type(dateTo)
    cy.get(websiteObjects.page.homePage.dateLabel).click()
 })
