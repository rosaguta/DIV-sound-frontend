/// <reference types="cypress" />

describe('login', () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000")
    })
    it('should login into the page', () => {
        const username = 'string';
        const password = 'string'

        cy.get('[placeholder="Username"]').type(username);
        cy.get('[placeholder="Password"]').type(password);
        cy.get('button').click();
        cy.contains('p', 'Hello string').should('exist');   
    })
    it ('return an error message because the user is unauthenticated', () =>{
        const username = "nonexistent"
        const password = "a"
        
        cy.get('[placeholder="Username"]').type(username);
        cy.get('[placeholder="Password"]').type(password);
        cy.get('button').click();
        cy.contains('p', 'Login failed bitch').should('exist');
    })
})

describe('landing page', () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000")
        cy.get('[placeholder="Username"]').type('Test');
        cy.get('[placeholder="Password"]').type('string');
        cy.get('button').click();
    })
    it('upload a file', () => {
        cy.get('input[type=file]').selectFile('cypress/e2e/3-soundboard/congrats.mp3')
        cy.contains('button', 'Upload').click()

        cy.get('.GridItem_gridItem__e_J2n').then(($divElement) => {
            // You can perform assertions or actions on the selected <div> element
            // For example, you can check if it contains a specific text or perform other assertions
            expect($divElement).to.contain('congrats.mp3');   
        })
    })
    it('removes a file from the all files page', () =>{

        cy.contains('span', 'DELETE ME!').click()

        cy.get('div[class="GridContainer_gridContainer__rZELv"]').should('have.length',0)
    })
})