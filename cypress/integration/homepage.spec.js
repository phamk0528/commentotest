describe("Render the homepage", ()=>{
    it("Render Home Page And Click Carousel",()=>{
        cy.visit('/');
        cy.get('.carousel').click();
        cy.location('pathname', {timeout: 10000}).should('include', '/articles/')
    })
}
)