import {expect, Locator, Page} from '@playwright/test';

// Page Object for the Header component
export class Header {
    page: Page;
    appLogo: Locator; // Application logo
    cartBadge: Locator; // Cart badge showing item count
    shoppingCart: Locator; // Shopping cart icon/button


    constructor(page: Page) {
        this.page = page;
        this.appLogo = page.locator('.app_logo');
        this.shoppingCart = page.locator('[data-test="shopping-cart-link"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    }

    // Verify the header is visible and contains the app logo
    async verifyHeader() {
        await expect(this.appLogo).toBeVisible();
        await expect(this.appLogo).toHaveText("Swag Labs");
    }

    // Verify the cart badge shows the expected item count
    async verifyCartBadge(expectedCount: number) {
        if (expectedCount === 0) {
            await expect(this.cartBadge).toHaveCount(0);
        } else {
            await expect(this.cartBadge).toHaveText(String(expectedCount));
        }
    }

    // Open the cart page
    async openCart() {
        await this.shoppingCart.click();
        await expect(this.page).toHaveURL(/cart\.html/);
    }
}