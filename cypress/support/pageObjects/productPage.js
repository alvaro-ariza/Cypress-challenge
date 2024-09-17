class ProductPage {
    // Add product to cart from the product details page
    addToCart() {
        cy.contains('Add to cart').click(); // Click the 'Add to cart' button
        cy.on('window:alert', (txt) => {
            expect(txt).to.contains('Product added');
        });
    }
}

export const productPage = new ProductPage();
