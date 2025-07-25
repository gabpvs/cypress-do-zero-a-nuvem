describe('Central de Atendimento ao Cliente TAT', () => {
  //vai rodar antes de cada suíte de testes
  beforeEach(() => {
    cy.visit('./src/index.html')
  }

  )
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário com sucesso', () => {

    const longText = Cypress._.repeat('Muito bom!', 100)

    cy.get('#firstName').type('Gabrielle')
    cy.get('#lastName').type('Santos')
    cy.get('#email').type('gabrielle@email.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Gabrielle')
    cy.get('#lastName').type('Santos')
    cy.get('#email').type('gabrielle@email,com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('campo telefone continua vazio quando preenchido com um valor não numérico', () => {
    cy.get('#phone')
      .type('abcde')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Gabrielle')
    cy.get('#lastName').type('Santos')
    cy.get('#email').type('gabrielle@email.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('#phone-checkbox').click()
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Gabrielle')
      .should('have.value', 'Gabrielle')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Santos')
      .should('have.value', 'Santos')
      .clear()
      .should('have.value', '')
    
    cy.get('#email')
      .type('gabrielle@email.com')
      .should('have.value', 'gabrielle@email.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('123456789')
      .should('have.value', '123456789')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    //cy.get('button[type="submit"]').click()


    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
   
   const data = {
    firstName: 'Gabrielle',
    lastName: 'Santos',
    email: 'gabrielle@email.com',
    text: 'Teste'
   }
   
   //usar (data) para chamar os dados da constante, ou () para usar os valores padrão setado no arquivo de comandos
    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      //índice 0 é a opção desabilitada (Selecione)
      .select(1)

      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    // poderia ser feito para cada, mas generalizar pega todos ao mesmo tempo
    //cy.get('#email-checkbox').check()
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
})
