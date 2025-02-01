
describe(
    "Auth protected btns", () => {
        it('should show auth protected modal', () => {
            cy.visit('/')
            cy.get('[data-id="profile"]').click()
            cy.get('[data-id="AuthProtectedModal"]').should('be.visible')

        })
    }
)
