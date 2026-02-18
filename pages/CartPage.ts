import {expect, Locator, Page} from '@playwright/test';

// Page Object for the Cart Page
export class CartPage {
    page: Page;
    pageTitle: Locator; // Page title
    cartList: Locator; // Cart items list container

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('.title');
        this.cartList = page.locator('.cart_list');
    }

    // Verify the cart page is loaded
    async verifyCartPage() {
        await expect(this.page).toHaveURL(/cart\.html/);
        await expect(this.pageTitle).toHaveText("Your Cart");
    }

    // Verify a specific item is present in the cart
    async verifyCartItem(itemName: string) {
        await expect(this.page.locator('.inventory_item_name')).toContainText(itemName)
    }

    // Proceed to checkout from the cart
    async openCheckOut() {
        await this.page.getByRole("button", { name: "Checkout" }).click();
        await expect(this.page).toHaveURL(/checkout-step-one\.html/);
    }
}