describe('Transações', () => {

    // hooks -> executar antes ou depois, de cada ou de todos os testes
    // before
    // after
    // beforeEach
    // afterEach

    beforeEach(() => {
        cy.visit("https://devfinance-agilizei.netlify.app/#")
        cy.viewport(1920, 1080)
    });
    it('Cadastrar uma entrada', () => {

        criarTransacao("Freelancer", 250)

        cy.get("tbody tr td.description").should("have.text", "Freelancer" )
    });
    it('Cadastrar uma saída', () => {

        criarTransacao("Cinema", -45)

        cy.get("tbody tr td.description").should("have.text", "Cinema")
    });
    it('Excluir transação', () => {
        criarTransacao("Freelancer", 100)
        criarTransacao("Mesada", 250)

        cy.contains(".description", "Freelancer") // td -> referencia
            .parent() // -> tr
            .find('img') // elemento que a gente precisa
            .click() // click
            
        cy.get('tbody tr').should("have.length", 1)
    });
});

function criarTransacao(descricao, valor) {
    cy.contains("Nova Transação").click()
    cy.get('#description').type(descricao)
    cy.get('#amount').type(valor)
    cy.get('#date').type("2024-09-15") // yyyy-mm-dd

    cy.contains('button', 'Salvar').click()
}