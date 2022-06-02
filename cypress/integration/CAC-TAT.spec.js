/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {

    beforeEach(() => {
        cy.visit('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
    })

    it('Verifica o título da aplicação', () => {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigaatórios e envia o formulário', () => {
        const longText = 'teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste'
        cy.get('#firstName').type('Helen')
        cy.get('#lastName').type('Ferreira')
        cy.get('#email').type('ferreirahelen@teste.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.get('button[type="submit"]').click()
        cy.get('.sucess').should('be.visible')
    })

    it('Exibe mensagem de erro ao submeter oformulário com email inválido', () => {
        cy.get('#firstName').type('Helen')
        cy.get('#lastName').type('Ferreira')
        cy.get('#email').type('ferreirahelen@teste,com')
        cy.get('#open-text-area').type('testando')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('Campo telefone deve continuar vazio ao receber valor não numérico', () => {
        cy.get('#phone').type('abcdefghij').should('have.value', '')

    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório, mas não é preenchido', () => {
        cy.get('#firstName').type('Helen')
        cy.get('#lastName').type('Ferreira')
        cy.get('#email').type('ferreirahelen@teste.com')
        cy.get('#phone-checknox').check()
        cy.get('#open-text-area').type('testando')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('Preenche os campos obrigaatórios e limpa os campos em seguida', () => {
        const longText = 'teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste'
        cy.get('#firstName')
            .type('Helen')
            .should('have.value', 'Helen')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Ferreira')
            .should('have.value', 'Ferreira')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('ferreirahelen@teste.com')
            .should('have.value', 'ferreirahelen@teste.com')
            .clear()
            .should('have.value', '')
        cy.get('#open-text-area')
            .type(longText, { delay: 0 })
            .should('have.value', longText)
            .clear()
            .should('have.value', '')
    })

    it('Exibe mensagem de erro ao submeter o formulário sem os campos obrigatórios preenchidos', () => {
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('Preenche os campos obrigaatórios e envia o formulário', () => {
        cy.fillMandatoryFieldsAndSubmit()
    })

    it('Seleciona o produto Youtube pelo seu texto', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('Seleciona o produto Mentoria pelo seu value', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('Seleciona o produto Blog pelo seu índice', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('Marca o tipo de atendimento Feedback', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('Marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('Marca ambos checkboxes, depois dermarca o último', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('Seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(($input) => {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Seleciona um arquivo simulando drag-and-drop', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(($input) => {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Seleciona um arquivo atribuindo um alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('@sampleFile')
            .should(($input) => {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de click', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('Acessa a página de política de privacidade removendo o target', () => {
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.contains('Talking About Testing').should('be.visible')
    })

})