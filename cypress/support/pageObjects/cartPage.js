class CartPage {
    // Visit the cart page
    visitCart() {
        cy.contains('Cart').click();
        cy.url().should('include', 'cart.html');
        cy.get('#totalp').should('be.visible');
    }

    // Verify the product is in the cart table inside tbody with id="tbodyid"
    verifyProductInCart(productName) {
        cy.xpath(`//tbody[@id='tbodyid']//td[contains(text(), '${productName}')]`).should('be.visible');
    }

    // Remove a product from the cart
    removeProductFromCart(productName) {
        // Assuming the Remove button is in the same row as the product name
        cy.xpath(`//tbody[@id='tbodyid']//td[contains(text(), '${productName}')]/following-sibling::td/a[contains(text(), 'Delete')]`).click();
    }

    // Complete the checkout process
    placeOrder(customer) {

        cy.get('#name').should('be.visible').type(customer.fullnam);
        cy.get('#country').should('be.visible').type(customer.country);
        cy.get('#city').should('be.visible').type(customer.city);
        cy.get('#card').should('be.visible').type(customer.card);
        cy.get('#month').should('be.visible').type(customer.month);
        cy.get('#year').should('be.visible').type(customer.year);
        cy.contains('Purchase').click();
        cy.contains('Thank you for your purchase!').should('be.visible');
    }
}

export const cartPage = new CartPage();
