describe('Login de usuário', ()=> {
    beforeEach(() => {
        cy.visit('/');
        //usado para interceptar um teste que estava dando certo para que falhasse
        // cy.intercept('POST', 'https://apialurapic.herokuapp.com/user/login', {
        //     statusCode:400
        // }).as('stubPost')
    })

    it('fazer login de usuario valido', ()=>{
        cy.login('flavio', '123');  //comando criado na pasta >support>gui_commands.js
        //cy.wait('@stubPost');
        cy.contains('a', '(Logout)').should('be.visible');
    })

    it('fazer login de usuario invalido', ()=>{
        cy.login('fulana', '1234');
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Invalid username or password')
        });
    })

})