//O describe é uma função q ue tem dois arguemntos: o nome da suit de testes (o que vai ser contemplado no conjunto de testes) e a segunda é uma função que pode executar qualquer coisa, como uma callback.
//Dentro da primeira orientação na função, o que vais er incluido é o beforeEach(), que vai ser executado antes do início de cada caso de teste para manter a interdependência entre os testes para um não afetar o resultado do outro.
//garantir a abertura antes da página antes de cada teste é dado pelo comando cy.visit('url')
// it é o item de teste, ou caso de teste individualizado.
//Arrange, Act, Assert => preparar o ambiente, o que quero fazer, o que vai ser verificado
//O comando should é o que faz o assert da página

//Criar um descrive passando o nome da suit de testes e o padrão
describe('Alura busca cursos', ()=> {
    //definir o que vai acontecer antes de cada caso de teste:
    beforeEach( () => {
        cy.visit('https://www.alura.com.br');
    })

    //escrever o primeiro caso de teste
    it('buscar curso de java', () => {
        //o cy.get representa o botão que eu quero buscar no site, o comando type me diz oq eu quero digitar
        cy.get('#header-barraBusca-form-campoBusca').type('java');
        cy.get('.header-barraBusca-form-submit').click();
        //Usando o select playground (o alvo que tem na página do Cypress) é possível detectar onde querermos fazer o teste
        //O 'have.text' vai procurar exatamente aquele texto e vale ressaltar que é CASE SENSITIVE
        //cy.get(':nth-child(3) > .busca-resultado-link > .busca-resultado-container > .busca-resultado-nome').should('have.text', 'Formação Aprenda a programar em Java com Orientação a Objetos');
        //Esse método não é interessante pq vai procurar exatamente onde o select playground apontou que o alvo estava. O ideal é procurar pelo elemento html

        //Editando a estrutura da busca pelo elemento HTML h4, e mudando o 'have.text' para 'contain', ele vai fazer a busca dentre todos os h4 da página e ver dentre eles qual contém o texto q tou procurando.
        cy.get('h4.busca-resultado-nome').should('contain', 'Formação Aprenda a programar em Java com Orientação a Objetos');
    });

    //Segundo caso de teste
    it('buscar curso de javaScript', ()=>{
        cy.get('#header-barraBusca-form-campoBusca').type('javaScript');
        cy.get('.header-barraBusca-form-submit').click();
        cy.get('h4.busca-resultado-nome').should('contain', 'Formação Explore React com JavaScript');
    })

    //Terceiro caso de uso
    it('buscar curso de python', () =>{
        cy.get('#header-barraBusca-form-campoBusca').type('python');
        cy.get('.header-barraBusca-form-submit').click();
        cy.get('h4.busca-resultado-nome').should('contain', 'Formação Python');
        
    })
})