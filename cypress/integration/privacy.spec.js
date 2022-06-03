Cypress._.times(5, () => {

    it('Testa a página da política de privacidade', () => {
        cy.visit('./src/privacy.html')
        cy.contains('Talking About Testing').should('be.visible')
    })
})