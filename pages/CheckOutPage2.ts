
import {expect, Locator, Page} from '@playwright/test';

// Page Object for Checkout Step Two (Order Overview)
export class CheckOutPage2 {
    page: Page;
    pageTitle: Locator; // Page title
    cartItems: Locator; // All cart item containers
    paymentInfoLabel: Locator; // Payment information label
    shippingInfoLabel: Locator; // Shipping information label
    itemTotalValue: Locator; // Item total value label
    taxValue: Locator; // Tax value label
    totalValue: Locator; // Total value label
    cancelButton: Locator; // Cancel button
    finishButton: Locator; // Finish button

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('.title');
        this.cartItems = page.locator('.cart_item');
        this.paymentInfoLabel = page.locator('text=Payment Information');
        this.shippingInfoLabel = page.locator('text=Shipping Information');
        this.itemTotalValue = page.locator('.summary_subtotal_label');
        this.taxValue = page.locator('.summary_tax_label');
        this.totalValue = page.locator('.summary_total_label');
        this.cancelButton = page.getByRole("button", { name: "Cancel" });
        this.finishButton = page.getByRole("button", { name: "Finish" });
    }

    // Verify the checkout step two page is loaded
    async verifyCheckoutStepTwoPage() {
        await expect(this.page).toHaveURL(/checkout-step-two\.html/);
        await expect(this.pageTitle).toHaveText("Checkout: Overview");
    }

    // Verify that there is at least one cart item
    async verifyCartItems() {
        const itemCount = await this.cartItems.count();
        expect(itemCount).toBeGreaterThan(0);
    }

    // Verify payment information section is visible
    async verifyPaymentInformation() {
        await expect(this.paymentInfoLabel).toBeVisible();
    }

    // Verify shipping information section is visible
    async verifyShippingInformation() {
        await expect(this.shippingInfoLabel).toBeVisible();
    }

    // Verify pricing details (item total, tax, total)
    async verifyPricing() {
        const itemTotalText = await this.itemTotalValue.textContent();
        const taxText = await this.taxValue.textContent();
        const totalText = await this.totalValue.textContent();

        await expect(this.itemTotalValue).toBeVisible();
        await expect(this.taxValue).toBeVisible();
        await expect(this.totalValue).toBeVisible();

        // Extract numeric values and verify total logic
        const itemTotal = parseFloat(itemTotalText?.split('$')[1]?.trim() || '0');
        const tax = parseFloat(taxText?.split("$")[1] || "0");
        const total = parseFloat(totalText?.split("$")[1] || "0");

        const calculatedTotal = itemTotal + tax;
        expect(total).toBeCloseTo(calculatedTotal, 2);
    }

    async clickCancelButton(){
        await this.cancelButton.click();
        await expect(this.page).toHaveURL(/inventory\.html/);
    }

    async clickFinishButton(){
        await this.finishButton.click();
        await expect(this.page).toHaveURL(/checkout-complete\.html/);
    }
}