import {expect, Locator, Page} from '@playwright/test';

// Page Object for Checkout Step One (User Information)
export class CheckOutPage1 {
    page: Page;
    pageTitle: Locator; // Page title
    firstNameInput: Locator; // First name input field
    lastNameInput: Locator; // Last name input field
    zipCodeInput: Locator; // Zip/Postal code input field
    continueButton: Locator; // Continue button

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('.title');
        this.firstNameInput = page.locator('input[placeholder="First Name"]');
        this.lastNameInput = page.locator('input[placeholder="Last Name"]');
        this.zipCodeInput = page.locator('input[placeholder="Zip/Postal Code"]');
        this.continueButton = page.getByRole("button", { name: "Continue" });
    }

    // Verify the checkout step one page is loaded
    async verifyCheckoutPageTitle() {
        await expect(this.page).toHaveURL(/checkout-step-one\.html/);
        await expect(this.pageTitle).toHaveText("Checkout: Your Information");
    }

    // Enter user details for checkout
    async enterCheckoutDetails(firstName: string, lastName: string, zipCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCodeInput.fill(zipCode);
    }

    // Click the continue button to proceed
    async clickContinueButton() {
        await this.continueButton.click();
        await expect(this.page).toHaveURL(/checkout-step-two\.html/);
    }
}