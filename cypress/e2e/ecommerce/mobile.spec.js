import { homePage } from '../../support/pageObjects/HomePage';
import { productPage } from '../../support/pageObjects/ProductPage';
import { cartPage } from '../../support/pageObjects/CartPage';

describe('E-commerce Mobile Tests', () => {
    let productName;
    let productHref;
    let customer;

    beforeEach(() => {
        // Set the viewport for mobile (e.g., iPhone 6)
        cy.viewport('iphone-6');

        // Load fixture data and set productName, productHref, and customer
        cy.fixture('data').then((data) => {
            productName = data.products.samsungGalaxyS6.name;
            productHref = data.products.samsungGalaxyS6.href;
            customer = data.customer;
        });

        homePage.visitHomePage();
    });

    it('Should add a product to the cart and verify it', () => {
        // Click on the product using href from fixture
        homePage.clickOnProductByHref(productHref);

        // Add product to cart from the product page
        productPage.addToCart();

        // Verify the product is in the cart
        cartPage.visitCart();
        cartPage.verifyProductInCart(productName);
    });

    it('Should remove a product from the cart', () => {
        // Click on the product using href from fixture
        homePage.clickOnProductByHref(productHref);

        // Add product to cart from the product page
        productPage.addToCart();

        // Visit cart
        cartPage.visitCart();

        // Remove product from the cart
        cartPage.removeProductFromCart(productName);

        // Verify the product is no longer in the cart
        cy.xpath(`//tbody[@id='tbodyid']//td[contains(text(), '${productName}')]`).should('not.exist');
    });

    it('Should complete the checkout process using fixture data', () => {
        // Click on the product using href from fixture
        homePage.clickOnProductByHref(productHref);

        // Add product to cart from the product page
        productPage.addToCart();

        // Visit the cart page and start the checkout process
        cartPage.visitCart();
        cy.contains('Place Order').click();

        // Complete the checkout process using customer data from the fixture
        cartPage.placeOrder(customer);
    });
});
