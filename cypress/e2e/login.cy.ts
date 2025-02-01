describe('Login Flow', () => {
    it('should login and redirect to the main page', () => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        cy.visit('/ru/login');

        cy.get('input[name="email"]').type('test1@gmail.com');
        cy.get('input[name="password"]').type('test');
        cy.get('button[type="submit"]').click();

        cy.url().should('include', '/ru');
        cy.contains('ФК Елимай').should('be.visible');
    });
    it.only('should login and show admin relative data', () => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        cy.visit('/ru/login');

        cy.get('input[name="email"]').type('test1@gmail.com');
        cy.get('input[name="password"]').type('test');
        cy.get('button[type="submit"]').click();

        cy.url().should('include', '/ru');
        cy.contains('Админ-панель').should('be.visible');
    });

})

