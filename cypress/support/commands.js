Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    const longText = 'teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste'
    cy.get('#firstName').type('Helen')
    cy.get('#lastName').type('Ferreira')
    cy.get('#email').type('ferreirahelen@teste.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()
    cy.get('.sucess').should('be.visible')
})