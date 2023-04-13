describe('Registro de usuário', ()=> {
    beforeEach(() => {
        cy.visit('/');
    })

    it('verifica mensagens de validação', () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Email is required!').should('be.visible');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'User name is required!').should('be.visible');
        cy.contains('ap-vmessage', 'Password is required!').should('be.visible');
        cy.contains('ap-vmessage', 'Full name is required!').should('be.visible');
    })

    it('verifica mensagem de email inválido', () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="email"]').type('fulana');
        cy.contains('ap-vmessage', 'Invalid e-mail').should('be.visible');
    })

    it('verifica se a senha tem o mínimo de caracteres', ()=>{
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="email"]').type('fulana@email.com');
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="password"]').type('12', {log: false});
        cy.contains('ap-vmessage', 'Mininum length is 8').should('be.visible');
    })

    it('verifica se o nome de usuário só tem letras minúsculas', ()=>{
        cy.contains('a', 'Register now').click();
        cy.get('input[formcontrolname="email"]').type('fulana@email.com');
        cy.get('input[formcontrolname="userName"]').type('Fulana');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Must be lower case').should('be.visible');
    })

    it('registrar usuario com sucesso', ()=>{
        cy.register('fulana@email.com', 'Fulana de Tal', 'fulaninha', '12345678'); //comando criado na pasta >support>gui_commands.js
    })

    const usuarios = require('../../fixtures/usuarios.json');
    usuarios.forEach(usuario => {
        it(`registrar usuario ${usuario.fullName} com sucesso`, () =>{
            cy.register(usuario.email, usuario.fullName, usuario.userName, usuario.password); //comando criado na pasta >support>gui_commands.js
        })
    })
})