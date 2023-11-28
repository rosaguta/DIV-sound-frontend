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
        cy.contains('Login').click();
        cy.contains('p', 'Hello string').should('exist');   
    })
    it ('return an error message because the user is unauthenticated', () =>{
        const username = "nonexistent"
        const password = "a"
        
        cy.get('[placeholder="Username"]').type(username);
        cy.get('[placeholder="Password"]').type(password);
        cy.get('button').click();
        cy.contains('p', 'Login failed').should('exist');
    })
})

describe('performing different actions', () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000")
        cy.get('[placeholder="Username"]').type('Test');
        cy.get('[placeholder="Password"]').type('string');
        cy.get('button').click();
    })
    it('upload a file', () => {
        cy.get('input[type=file]').selectFile('./cypress/e2e/3-soundboard/congrats.mp3')
        cy.contains('button', 'Upload').click()

        cy.contains('p','congrats.mp3').then(($divElement) => {
            // You can perform assertions or actions on the selected <div> element
            // For example, you can check if it contains a specific text or perform other assertions
            expect($divElement).to.contain('congrats.mp3');   
        })
    })
    it('creates a new soundboard',()=>{
        cy.contains('p', 'Create Soundboard').click()
        cy.get('input[name="boardname"]').type('WOWOWOW');
        cy.contains('button', 'Submit').click()

        cy.contains('a', 'WOWOWOW').click()
        cy.get('h2').should('have.text', 'All FilesWOWOWOW');
        
    })
    it('adds file to board', () =>{

        cy.contains('Add To:').click();
        cy.get('[role="menuitem"]').contains('WOWOWOW').click()
        cy.contains('a', 'WOWOWOW').click()
        
        cy.contains('REMOVE ME FROM BOARD').should('exist')
    })
    it('removes a file from a board', ()=>{
        cy.contains('a', 'WOWOWOW').click()
        cy.contains('REMOVE ME FROM BOARD').click()

        cy.get('.GridContainer_gridContainer__rZELv').should('have.html', '');  
        
    })
    it('removes a file from the all files page', () =>{

        cy.contains('span', 'DELETE ME!').click()

        cy.get('div[class="GridContainer_gridContainer__rZELv"]').should('have.length',0)
    })
    it('removes the board', ()=>{
        cy.contains('a', 'WOWOWOW').click()
        cy.contains('button', 'Delete dis Board').click()

        // cy.get('.sidebar_sidebar__D8ym4 ul:first-child's).find('a').contains('WOWOWOW').should('not.exist');

        cy.url().should('eq', 'http://localhost:3000/soundboard');

    })


})