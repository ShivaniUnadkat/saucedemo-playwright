import {expect, Locator, Page} from '@playwright/test';

// Page Object for Checkout Complete Page
export class CheckOutComplete {
    page: Page;
    pageTitle: Locator; // Page title
    thankYouMessage: Locator; // Thank you message element
    orderConfirmationText: Locator; // Order confirmation text element
    backHomeButton: Locator; // Back Home button

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('.title');
        this.thankYouMessage = page.locator('.complete-header');
        this.orderConfirmationText = page.locator('.complete-text');
        this.backHomeButton = page.getByRole("button", { name: "Back Home" });
    }

    // Verify the checkout complete page is loaded
    async verifyCheckoutCompletePage() {
        await expect(this.page).toHaveURL(/checkout-complete\.html/);
        await expect(this.pageTitle).toHaveText("Checkout: Complete!");
    }

    // Verify the thank you message is visible
    async verifyThankYouMessage() {
        await expect(this.thankYouMessage).toBeVisible();
        await expect(this.thankYouMessage).toContainText("Thank you");
    }

    // Verify the order confirmation text is visible
    async verifyOrderConfirmationText() {
        await expect(this.orderConfirmationText).toBeVisible();
    }

    // Click the Back Home button to return to inventory
    async clickBackHomeButton() {
        await this.backHomeButton.click();
        await expect(this.page).toHaveURL(/inventory\.html/);
    }
}