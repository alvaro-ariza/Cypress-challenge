class HomePage {
    // Navigate to the home page
    visitHomePage() {
        cy.visit('https://www.demoblaze.com');
    }

    // Click on a product using its href attribute
    clickOnProductByHref(productHref) {
        cy.xpath(`//a[contains(@href, '${productHref}')]`).first().click(); // Locate product using href attribute
        cy.url().should('include', 'prod.html'); // Wait for the URL to change to the product page
    }
}

export const homePage = new HomePage();
