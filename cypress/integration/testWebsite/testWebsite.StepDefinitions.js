import { root as websiteObjects } from '../../pageObjects/website'

let website = Cypress.env('host')
// let eventPlace = 'Avia Solutions Group arena'
// let caption = 'CIRQUE DU SOLEIL - CORTEO'
// let dateFrom = '2022-08-28'
// let dateTo = '2022-08-28'
let localTimeOut = 1500

Given ('Navigate to the website',() => {
    cy.intercept('https://www.tiketa.lt/EN/AutoComplete/').as('AutoComplete')
    cy.intercept('https://www.tiketa.lt/EN/AutoCompletePlayers/').as('AutoCompletePlayers')
    cy.visitWebsite(website)
    cy.url().should('include', 'https://www.tiketa.lt/EN/search')
    cy.get(websiteObjects.page.homePage.logo).should('be.visible')
    cy.wait(localTimeOut)
})

When ('I input search fields',(datatable) => {
    datatable.hashes().forEach(element => {
        cy.inputSearchFields(element.caption, element.eventPlace, element.dateFrom, element.dateTo)
        cy.wait(localTimeOut)
    })
})

And ('Click Search button',() => {
    cy.get(websiteObjects.page.homePage.button.search).click()
    cy.checkResponse('@AutoComplete', 1)
    cy.checkResponse('@AutoCompletePlayers', 1)
})

Then ('I verify the number of options that are available',(datatable) => {
    datatable.hashes().forEach(element => {
    cy.get(websiteObjects.page.homePage.event.caption).invoke('text').should('be.equal', element.caption)
    cy.get(websiteObjects.page.homePage.event.eventPlace).invoke('text').should('be.equal', element.eventPlace)
    cy.get(websiteObjects.page.homePage.event.button.buy).click()
    cy.wait(localTimeOut)
    cy.get(websiteObjects.page.homePage.ticketsList).find('div.page-content').should('have.length', 6)
    cy.wait(localTimeOut)
})
})